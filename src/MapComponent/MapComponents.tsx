import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import ObjectDialog from '../ObjectDialog/ObjectDialog'; // ваш компонент диалога
import { reverseGeocode } from '../hooks'; // ваша функция обратного геокодирования
import { CircularProgress, Box } from '@mui/material'; // импорт из MUI

const defaultIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

interface MapObject {
    position: LatLng;
    properties: Record<string, any>;
}

const MapComponent: React.FC = () => {
    const initialPosition: [number, number] = [55.7558, 37.6173]; // Москва

    const [selectedObject, setSelectedObject] = useState<MapObject | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); 

    const MapEventHandler = () => {
        useMapEvents({
            click(e) {
                const clickedPosition = e.latlng;
                const { lat, lng } = clickedPosition;

                setLoading(true); 

                reverseGeocode(lat, lng)
                    .then((address) => {
                        const newObject: MapObject = {
                            position: clickedPosition,
                            properties: {
                                clickedAt: new Date().toLocaleString(),
                                coord: clickedPosition,
                                address: address || 'Не удалось определить адрес',
                            },
                        };
                        setSelectedObject(newObject);
                        setTimeout(() => {
                            setDialogOpen(true);
                            setLoading(false); 
                        }, 300);
                    })
                    .catch((error) => {
                        console.error('Ошибка получения адреса:', error);
                        const newObject: MapObject = {
                            position: clickedPosition,
                            properties: {
                                clickedAt: new Date().toLocaleString(),
                                coord: clickedPosition,
                                address: 'Ошибка определения адреса',
                            },
                        };
                        setSelectedObject(newObject);
                        setTimeout(() => {
                            setDialogOpen(true);
                            setLoading(false);
                        }, 300);
                    });
            }
        });
        return null;
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div style={{ position: 'relative', height: '750px', width: '100%' }}>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEventHandler />

                {selectedObject && (
                    <>
                        <Marker position={selectedObject.position} icon={defaultIcon}>
                            <Popup>
                                {Object.entries(selectedObject.properties).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                            </Popup>
                        </Marker>
                        <ObjectDialog
                            open={dialogOpen}
                            onClose={handleCloseDialog}
                            date={{
                                coord: selectedObject.properties.coord,
                                address: selectedObject.properties.address,
                            }}
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;