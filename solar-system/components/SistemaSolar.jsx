import React, { useState, useEffect, useRef } from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { StyleSheet, View, Text, Image, Animated, Dimensions, TouchableOpacity, Modal, ScrollView, Platform } from "react-native";
import planetsData from '../src/planetsData.json';

export default function SolarSystem() {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('window');
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Estados para el modal de información
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    // Generar estrellas aleatorias
    const [stars, setStars] = useState([]);
    const animatedValues = useRef([]).current;
    const movementValues = useRef([]).current;
    
    // Valores animados para las órbitas de los planetas
    const planetAnimations = useRef({}).current;

    // Configuración de posiciones fijas para los planetas
    const planetConfig = {
        sol: { x: centerX, y: centerY, size: 80 },
        mercurio: { x: centerX - 140, y: centerY - 120, size: 25 },
        venus: { x: centerX + 100, y: centerY - 160, size: 30 },
        tierra: { x: centerX - 160, y: centerY + 100, size: 32 },
        marte: { x: centerX + 140, y: centerY + 120, size: 28 },
        jupiter: { x: centerX - 220, y: centerY - 40, size: 55 },
        saturno: { x: centerX + 200, y: centerY - 60, size: 50 },
        urano: { x: centerX - 100, y: centerY + 200, size: 40 },
        neptuno: { x: centerX + 180, y: centerY + 180, size: 38 }
    };

    useEffect(() => {
        // Crear array de estrellas con posiciones aleatorias
        const starArray = [];
        const numStars = 80; // Reducir significativamente el número de estrellas
        
        for (let i = 0; i < numStars; i++) {
            starArray.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 1, // Tamaños más consistentes
                opacity: Math.random() * 0.4 + 0.6, // Opacidad inicial alta
            });
            
            // Crear valores animados para cada estrella con valor inicial visible
            animatedValues[i] = new Animated.Value(0.7 + Math.random() * 0.3); // Empezar muy visible
            movementValues[i] = {
                x: new Animated.Value(Math.random() * width),
                y: new Animated.Value(Math.random() * height),
            };
        }
        
        setStars(starArray);
        
        // Retraso mínimo para iniciar animaciones después del renderizado inicial
        setTimeout(() => {
            startStarAnimations();
        }, 100);
    }, []);

    const startStarAnimations = () => {
        // Dividir las animaciones en lotes para mejor rendimiento
        animatedValues.forEach((value, index) => {
            // Solo parpadeo, sin movimiento para mejor rendimiento
            const twinkleAnimation = () => {
                Animated.timing(value, {
                    toValue: value._value > 0.5 ? 0.4 : 1,
                    duration: 1500 + Math.random() * 2000,
                    useNativeDriver: true,
                }).start(() => twinkleAnimation());
            };
            
            // Iniciar animaciones escalonadas para suavizar la carga
            setTimeout(() => {
                twinkleAnimation();
            }, index * 20); // 20ms de diferencia entre cada estrella
        });
    };

    const handlePlanetPress = (planet) => {
        console.log('Planeta presionado:', planet.nombre); // Para debug
        console.log('ID del planeta:', planet.id); // Para debug adicional
        console.log('Información del planeta:', planet); // Debug completo
        setSelectedPlanet(planet);
        setModalVisible(true);
    };

    const renderPlanet = (planet) => {
        const config = planetConfig[planet.id];
        
        return (
            <TouchableOpacity
                key={planet.id}
                style={[
                    styles.planetTouchArea,
                    {
                        width: config.size + 20,
                        height: config.size + 20,
                        left: config.x - (config.size + 20) / 2,
                        top: config.y - (config.size + 20) / 2,
                    }
                ]}
                onPress={() => handlePlanetPress(planet)}
                activeOpacity={0.8}
                delayPressIn={0}
                delayPressOut={0}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <View style={[
                    styles.planet,
                    planet.id === 'sol' ? styles.sun : null,
                    {
                        width: config.size,
                        height: config.size,
                    }
                ]}>
                    <Image
                        source={planet.id === 'sol' ? require('../src/planets/005-sun.png') : getImageSource(planet.imagen)}
                        style={[styles.planetImage, {
                            width: config.size,
                            height: config.size,
                        }]}
                    />
                </View>
                
                {/* Etiqueta con el nombre del planeta */}
                <Text style={[
                    styles.planetLabel,
                    {
                        left: -(80 - (config.size + 20)) / 2,
                        top: (config.size + 10) / 2 + 40,
                    }
                ]}>
                    {planet.nombre}
                </Text>
            </TouchableOpacity>
        );
    };

    const getImageSource = (imagePath) => {
        const imageMap = {
            './src/planets/001-neptune.png': require('../src/planets/001-neptune.png'),
            './src/planets/002-saturn.png': require('../src/planets/002-saturn.png'),
            './src/planets/003-planet.png': require('../src/planets/003-planet.png'),
            './src/planets/004-venus.png': require('../src/planets/004-venus.png'),
            './src/planets/005-sun.png': require('../src/planets/005-sun.png'),
            './src/planets/006-mercury.png': require('../src/planets/006-mercury.png'),
            './src/planets/007-earth.png': require('../src/planets/007-earth.png'),
            './src/planets/008-mars.png': require('../src/planets/008-mars.png'),
            './src/planets/009-uranus.png': require('../src/planets/009-uranus.png'),
        };
        return imageMap[imagePath];
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {/* Fondo estrellado */}
            <View style={styles.starField}>
                {stars.map((star, index) => (
                    <Animated.View
                        key={star.id}
                        style={[
                            styles.star,
                            {
                                left: star.x,
                                top: star.y,
                                width: star.size,
                                height: star.size,
                                opacity: animatedValues[index],
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Título */}
            <Text style={styles.title}> SISTEMA SOLAR </Text>
            
            {/* Texto instructivo */}
            <Text style={styles.instructionText}>Haz clic sobre un planeta para conocer más información</Text>
            
            {/* Planetas */}
            {planetsData.planetas.map(planet => renderPlanet(planet))}

            {/* Modal de información */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedPlanet && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                                
                                <View style={styles.modalHeader}>
                                    <Image
                                        source={getImageSource(selectedPlanet.imagen)}
                                        style={styles.modalPlanetImage}
                                    />
                                    <Text style={styles.modalTitle}>{selectedPlanet.nombre}</Text>
                                    <Text style={styles.modalType}>{selectedPlanet.tipo}</Text>
                                </View>

                                <View style={styles.infoSection}>
                                    <Text style={styles.sectionTitle}>📏 Datos Básicos</Text>
                                    <Text style={styles.infoText}>Radio: {selectedPlanet.radio}</Text>
                                    <Text style={styles.infoText}>Masa: {selectedPlanet.masa}</Text>
                                    {selectedPlanet.distancia_al_sol && (
                                        <Text style={styles.infoText}>Distancia al Sol: {selectedPlanet.distancia_al_sol}</Text>
                                    )}
                                    {selectedPlanet.gravedad && (
                                        <Text style={styles.infoText}>Gravedad: {selectedPlanet.gravedad}</Text>
                                    )}
                                    {selectedPlanet.periodo_orbital && (
                                        <Text style={styles.infoText}>Periodo orbital: {selectedPlanet.periodo_orbital}</Text>
                                    )}
                                    {selectedPlanet.periodo_rotacion && (
                                        <Text style={styles.infoText}>Periodo de rotación: {selectedPlanet.periodo_rotacion}</Text>
                                    )}
                                    {selectedPlanet.lunas !== undefined && (
                                        <Text style={styles.infoText}>Lunas: {selectedPlanet.lunas}</Text>
                                    )}
                                </View>

                                {selectedPlanet.temperatura_superficie && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>🌡️ Temperatura</Text>
                                        <Text style={styles.infoText}>Superficie: {selectedPlanet.temperatura_superficie}</Text>
                                        {selectedPlanet.temperatura_max && (
                                            <Text style={styles.infoText}>Máxima: {selectedPlanet.temperatura_max}</Text>
                                        )}
                                        {selectedPlanet.temperatura_min && (
                                            <Text style={styles.infoText}>Mínima: {selectedPlanet.temperatura_min}</Text>
                                        )}
                                        {selectedPlanet.temperatura_media && (
                                            <Text style={styles.infoText}>Media: {selectedPlanet.temperatura_media}</Text>
                                        )}
                                        {selectedPlanet.temperatura_nucleo && (
                                            <Text style={styles.infoText}>Núcleo: {selectedPlanet.temperatura_nucleo}</Text>
                                        )}
                                    </View>
                                )}

                                {selectedPlanet.atmosfera && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>🌬️ Atmósfera</Text>
                                        <Text style={styles.infoText}>Composición: {selectedPlanet.atmosfera}</Text>
                                        {selectedPlanet.presion_atmosferica && (
                                            <Text style={styles.infoText}>Presión: {selectedPlanet.presion_atmosferica}</Text>
                                        )}
                                    </View>
                                )}

                                {selectedPlanet.composicion && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>⚛️ Composición</Text>
                                        <Text style={styles.infoText}>{selectedPlanet.composicion}</Text>
                                    </View>
                                )}

                                <View style={styles.infoSection}>
                                    <Text style={styles.sectionTitle}>⭐ Características Únicas</Text>
                                    {selectedPlanet.caracteristicas_unicas.map((caracteristica, index) => (
                                        <Text key={index} style={styles.bulletPoint}>• {caracteristica}</Text>
                                    ))}
                                </View>

                                {selectedPlanet.datos_curiosos && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionTitle}>🤔 ¿Sabías que...?</Text>
                                        <Text style={styles.infoText}>{selectedPlanet.datos_curiosos}</Text>
                                    </View>
                                )}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000011',
    },
    starField: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    star: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: 1,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
    },
    title: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#FFD700',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'monospace',
        textShadowColor: 'rgba(255, 215, 0, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
        zIndex: 10,
    },
    instructionText: {
        position: 'absolute',
        top: 95,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#87CEEB',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        zIndex: 10,
        paddingHorizontal: 20,
    },
    planetTouchArea: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'transparent',
        borderRadius: 50,
    },
    planet: {
        borderRadius: 50,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 8,
    },
    sun: {
        shadowColor: '#FFD700',
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    planetImage: {
        borderRadius: 50,
        resizeMode: 'contain',
    },
    planetLabel: {
        position: 'absolute',
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#1a1a2e',
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ff6b6b',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    modalPlanetImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius: 40,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'monospace',
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
        marginBottom: 5,
    },
    modalType: {
        fontSize: 16,
        color: '#87CEEB',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    infoSection: {
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 10,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
        fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'monospace',
    },
    infoText: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 5,
        lineHeight: 20,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#87CEEB',
        marginBottom: 5,
        lineHeight: 20,
        paddingLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});