import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderTrackingScreen = ({ order }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (order.status === 'en_route') {
      fetchAd(order.productCategory).then(setAd);
    }
  }, [order]);

  const fetchAd = async (category) => {
    const response = await fetch(`https://your-backend-api/ads?category=${category}`);
    return response.json();
  };

  return (
    <View style={styles.container}>
      {/* Map and Tracking Details */}
      <Text>Tracking your order: {order.id}</Text>
      {ad && (
        <View style={styles.adContainer}>
          <Image source={{ uri: ad.imageUrl }} style={styles.adImage} />
          <Text>{ad.title}</Text>
          <TouchableOpacity onPress={() => setAd(null)} style={styles.dismissButton}>
            <Text>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  adContainer: { position: 'absolute', bottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 5 },
  adImage: { width: 100, height: 100, resizeMode: 'cover' },
  dismissButton: { marginTop: 10, alignSelf: 'flex-end' },
});

export default OrderTrackingScreen;