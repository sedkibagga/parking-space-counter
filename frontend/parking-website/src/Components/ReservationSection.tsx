import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useAuth } from './AuthContexte';
import { createReservationDto } from '../Apis/DataParam/dataParam';
import apiService from '../Apis/Services/apisService';
import { useNavigate } from 'react-router-dom';
const ReservationForm: React.FC = () => {
    const navigate = useNavigate(); 
    const [numTel, setNumTel] = useState('');
    const [dateReservation, setDateReservation] = useState<string>('');
    const [heureDebut, setHeureDebut] = useState<string>('');
    const [heureFin, setHeureFin] = useState<string>('');
    const [montant, setMontant] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const {user , placeClicked} = useAuth();
    console.log("user:",user);
    console.log("placeClicked",placeClicked);
    // Fonction pour valider le numéro de téléphone (doit être composé de 8 chiffres)
    const validateNumTel = (num: string) => {
        return /^[0-9]{8}$/.test(num);
    };

    // Fonction pour vérifier les champs requis
    const validateFields = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};


        if (!numTel || !validateNumTel(numTel)) {
            newErrors.numTel = 'Le numéro de téléphone est requis et doit être composé de 8 chiffres.';
            valid = false;
        }


        if (!dateReservation) {
            newErrors.dateReservation = 'La date de réservation est requise.';
            valid = false;
        }

        if (!heureDebut) {
            newErrors.heureDebut = 'L\'heure de début est requise.';
            valid = false;
        }

        if (!heureFin) {
            newErrors.heureFin = 'L\'heure de fin est requise.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

  
    const calculerMontant = () => {
        if (!validateFields()) return;

        // Vérifier si les heures sont valides
        if (!heureDebut || !heureFin) {
            setErrors((prev) => ({
                ...prev,
                heure: 'Les heures de début et de fin doivent être remplies.'
            }));
            return;
        }

       
        const heureDebutInt = parseInt(heureDebut.split(':')[0]);
        const heureFinInt = parseInt(heureFin.split(':')[0]);

        // Vérifier que l'heure de début est avant l'heure de fin
        if (heureDebutInt >= heureFinInt) {
            setErrors((prev) => ({
                ...prev,
                heure: 'L\'heure de début doit être avant l\'heure de fin.'
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                heure: ''
            }));
        }

        
        const differenceEnHeures = heureFinInt - heureDebutInt;
        setMontant(differenceEnHeures * 20); // Exemple : 20 unités par heure
    };
    const handleSubmit = async() => {
        try {
            if (!validateFields()) return;
            const reservationTime = `${dateReservation}T${heureDebut}:00`;
            console.log("reservationTime",reservationTime);
            const heureDebutInt = parseInt(heureDebut.split(':')[0]);
            const heureFinInt = parseInt(heureFin.split(':')[0]);
            const reservationDuration = heureFinInt - heureDebutInt;
            console.log("reservationDuration",reservationDuration);
            const reservationData:createReservationDto = {
                reservation_Time: reservationTime,
                reservation_Duration: reservationDuration.toString(),
            };
    
            console.log("Reservation Data:", reservationData);
            if (user?.token) {
                const response = await apiService.createReservation(reservationData, placeClicked, user.token);
                console.log("reserved with succ:" , response);
                navigate('/Home');
            } else {
                console.error('User token is undefined');
            }
        } catch (error:any) {
            console.log("error:", error.message);
            alert(error.message);
        }
        

    }

    return (
        <Box sx={{ padding: 6, maxWidth: '600px', marginTop: "1%", }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: "4%", color: '#050507', fontWeight: 'bold' }}>
                Form To Reserve The Spot
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nom"
                        fullWidth
                        value={user ? `${user.firstName}${user.lastName}` : ''}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                            "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                    color: "#050507"
                                }
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "&.Mui-focused fieldset": {
                                    borderColor: "#050507"
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={user?.tel}
                        onChange={(e) => setNumTel(e.target.value)}
                        error={!!errors.numTel}
                        helperText={errors.numTel}
                        sx={{
                            "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                    color: "#050507"
                                }
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "&.Mui-focused fieldset": {
                                    borderColor: "#050507"
                                }
                            }
                        }}
                    />
                </Grid>
                

                {/* Champs de Date, Heure de début et Heure de fin */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Date of Reservation"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateReservation}
                        onChange={(e) => setDateReservation(e.target.value)}
                        error={!!errors.dateReservation}
                        helperText={errors.dateReservation}
                        sx={{
                            "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                    color: "#050507"
                                }
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "&.Mui-focused fieldset": {
                                    borderColor: "#050507"
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Start time"
                        type="time"
                        fullWidth
                        value={heureDebut}
                        onChange={(e) => setHeureDebut(e.target.value)}
                        error={!!errors.heureDebut}
                        helperText={errors.heureDebut}
                        sx={{
                            "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                    color: "#050507"
                                }
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "&.Mui-focused fieldset": {
                                    borderColor: "#050507"
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Ending Time"
                        type="time"
                        fullWidth
                        value={heureFin}
                        onChange={(e) => setHeureFin(e.target.value)}
                        error={!!errors.heureFin}
                        helperText={errors.heureFin}
                        sx={{
                            "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                    color: "#050507"
                                }
                            },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "&.Mui-focused fieldset": {
                                    borderColor: "#050507"
                                }
                            }
                        }}
                    />
                </Grid>
                </Grid>

                {errors.heure && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
                            {errors.heure}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#050507' }}>
                        Amount To Pay: {montant} TND
                    </Typography>
                </Grid>

                {/* Boutons centrés */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={calculerMontant}
                        sx={{
                            backgroundColor: '#E3311D',
                            color: '#fff',
                            height: '40px',
                            borderRadius: '15px',
                            width: '200px',
                            '&:hover': {
                                backgroundColor: '#C92A1D',
                            },
                            margin: '10px',
                        }}
                    >
                        Calculate Amount
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            height: '40px',
                            borderRadius: '15px',
                            width: '80px',
                            '&:hover': {
                                backgroundColor: '#388E3C',
                            },
                            margin: '10px',
                        }}
                    >
                        Pay
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReservationForm;
