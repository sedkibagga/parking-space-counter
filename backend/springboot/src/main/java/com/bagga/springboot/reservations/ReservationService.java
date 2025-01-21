package com.bagga.springboot.reservations;

import com.bagga.springboot.entities.ParkingHistoryOfUser;
import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.FeignClientRepository;
import com.bagga.springboot.repositories.ParkingHistoryOfUserRepository;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.dtos.UpdateReservationDto;
import com.bagga.springboot.reservations.responses.*;
import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    private final ReservedPlacesRepository reservedPlacesRepository;
    private final FeignClientRepository feignClientRepository;
    private final UserRepository userRepository;
    private final ParkingHistoryOfUserRepository parkingHistoryOfUserRepository;

    public DeletReservationResponse deleteReservation(Integer id) {
        ReservedPlaces reservedPlaces = this.reservedPlacesRepository.findById(id).orElseThrow(() -> new RuntimeException("Reservation not found."));
        this.reservedPlacesRepository.delete(reservedPlaces);
        return DeletReservationResponse.builder()
                .id(reservedPlaces.getId())
                .zoneId(reservedPlaces.getZoneId())
                .status(reservedPlaces.getStatus())
                .reservation_Time(reservedPlaces.getReservation_Time())
                .reservation_Duration(reservedPlaces.getReservation_Duration())
                .total_Amount(reservedPlaces.getTotal_Amount())
                .userId(reservedPlaces.getUser().getId())
                .build();

    }

public List<GetReservationResponse> getReservations () {
        try {
            List<ReservedPlaces> reservedPlaces = this.reservedPlacesRepository.findAll();
            return reservedPlaces.stream()
                    .map(reservedPlaces1 -> {
                        return GetReservationResponse.builder()
                                .id(reservedPlaces1.getId())
                                .zoneId(reservedPlaces1.getZoneId())
                                .reservation_Duration(reservedPlaces1.getReservation_Duration())
                                .reservation_Time(reservedPlaces1.getReservation_Time())
                                .total_Amount(reservedPlaces1.getTotal_Amount())
                                .cin(reservedPlaces1.getUser().getCin())
                                .email(reservedPlaces1.getUser().getEmail())
                                .build();
                    })
                    .collect(Collectors.toList()) ;
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
}

    public UpdateReservationResponse updateReservation(Integer id, UpdateReservationDto updateReservationDto) {
        try {
            ReservedPlaces oldPlaceReserved = this.reservedPlacesRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Reservation not found."));

            List<ZoneStatus> libreZones = this.feignClientRepository.getLibreZones();

            List<ReservedPlaces> occupiedZonesWithReservation = this.reservedPlacesRepository.findAll();

            if (updateReservationDto.getZoneId() != null) {
                ZoneStatus newZoneReserved = libreZones.stream()
                        .filter(zone -> zone.getZoneId() == updateReservationDto.getZoneId())
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Zone not available."));

                oldPlaceReserved.setZoneId(newZoneReserved.getZoneId());
            }

            if (updateReservationDto.getReservation_Time() != null) {
                List<ReservedPlaces> reservedPlacesWithMyZoneId = occupiedZonesWithReservation.stream()
                        .filter(zone -> Objects.equals(zone.getZoneId(), oldPlaceReserved.getZoneId()))
                        .collect(Collectors.toList());

                List<ReservedPlaces> conflictingReservations = reservedPlacesWithMyZoneId.stream()
                        .filter(zone -> zone.getReservation_Time().equals(updateReservationDto.getReservation_Time()))
                        .collect(Collectors.toList());

                if (conflictingReservations.isEmpty()) {
                    oldPlaceReserved.setReservation_Time(updateReservationDto.getReservation_Time());
                } else {

                    throw new RuntimeException("This time is already reserved.");
                }
            }

            ReservedPlaces updatedReservation = this.reservedPlacesRepository.save(oldPlaceReserved);


            return UpdateReservationResponse.builder()
                    .id(updatedReservation.getId())
                    .zoneId(updatedReservation.getZoneId())
                    .build();

        } catch (Exception e) {
            log.error("Error updating reservation: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to update reservation", e);
        }
    }


    public List<GetReservationByUserId> getReservationByUserId(Integer userId) {
        try {
            User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            List<ReservedPlaces> reservedPlaces = this.reservedPlacesRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Reservation not found."));
            return reservedPlaces.stream()
                    .map(reservedPlaces1 -> {
                        return GetReservationByUserId.builder()
                                .id(reservedPlaces1.getId())
                                .zoneId(reservedPlaces1.getZoneId())
                                .reservation_Duration(reservedPlaces1.getReservation_Duration())
                                .reservation_Time(reservedPlaces1.getReservation_Time())
                                .total_Amount(reservedPlaces1.getTotal_Amount())
                                .cin(reservedPlaces1.getUser().getCin())
                                .email(reservedPlaces1.getUser().getEmail())
                                .build();
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }


    public List<GetParkingHistoryByUserId> getParkingHistoryByUserIds(Integer userId) {
        try {
            User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            List<ParkingHistoryOfUser> getParkingHistory = this.parkingHistoryOfUserRepository.getParkingHistoryOfUserByUser(user).orElseThrow(() -> new RuntimeException("Reservation not found."));
            return getParkingHistory.stream()
                    .map(parkingHistoryOfUser -> {
                        return GetParkingHistoryByUserId.builder()
                                .id(parkingHistoryOfUser.getId())
                                .zoneId(parkingHistoryOfUser.getZoneId())
                                .cin(parkingHistoryOfUser.getUser().getCin())
                                .email(parkingHistoryOfUser.getUser().getEmail())
                                .firstName(parkingHistoryOfUser.getUser().getFirstName())
                                .lastName(parkingHistoryOfUser.getUser().getLastName())
                                .createdDate(parkingHistoryOfUser.getCreatedDate())
                                .build();
                    })
                    .collect(Collectors.toList()) ;

        } catch (Exception e) {
        log.info(e.getMessage());
        throw new RuntimeException(e);
         }
    }

    public DeleteParkingHistoryByIdResponse deleteParkingHistoryById(Integer id) {
        try {
            ParkingHistoryOfUser parkingHistoryOfUser = this.parkingHistoryOfUserRepository.findById(id).orElseThrow(() -> new RuntimeException("Reservation not found."));
            this.parkingHistoryOfUserRepository.delete(parkingHistoryOfUser);
            return DeleteParkingHistoryByIdResponse.builder()
                    .id(parkingHistoryOfUser.getId())
                    .zoneId(parkingHistoryOfUser.getZoneId())
                    .cin(parkingHistoryOfUser.getUser().getCin())
                    .email(parkingHistoryOfUser.getUser().getEmail())
                    .firstName(parkingHistoryOfUser.getUser().getFirstName())
                    .lastName(parkingHistoryOfUser.getUser().getLastName())
                    .createdDate(parkingHistoryOfUser.getCreatedDate())
                    .build();

        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }


}
