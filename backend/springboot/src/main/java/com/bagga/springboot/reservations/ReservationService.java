package com.bagga.springboot.reservations;

import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.reservations.responses.DeletReservationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
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
}
