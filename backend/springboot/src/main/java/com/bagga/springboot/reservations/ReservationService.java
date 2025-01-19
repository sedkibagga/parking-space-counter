package com.bagga.springboot.reservations;

import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.reservations.dtos.UpdateReservationDto;
import com.bagga.springboot.reservations.responses.DeletReservationResponse;
import com.bagga.springboot.reservations.responses.GetReservationResponse;
import com.bagga.springboot.reservations.responses.UpdateReservationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    private final ReservedPlacesRepository reservedPlacesRepository;

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


}
