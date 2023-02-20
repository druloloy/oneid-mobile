import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import SocketService from '../../../services/SocketService';
import theme from '../../../theme.config';
import {ScrollView} from 'react-native-gesture-handler';
import interval from '../../../utils/interval';

const {ColorTheme, FontFamily} = theme;

export default function PatientQueue() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [queueNumber, setQueueNumber] = useState(0);
  const [size, setSize] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const [userId, setUserId] = useState('');
  const [patientOngoing, setPatientOngoing] = useState(null);
  const [status, setStatus] = useState('Waiting');
  const [loading, setLoading] = useState(true);

  const socket = SocketService.init();

  useEffect(() => {
    if (socket) {
      socket.on('queue::id', id => {
        if (!userId) SocketService.getId(id, setUserId);
      });

      socket.on('connection', () => SocketService.connection(setConnected));
      socket.on('disconnect', () => SocketService.disconnect(setConnected));
      socket.on('queue::all', data => SocketService.fetchData(data, setData));

      return () => {
        socket.off('disconnect', () => SocketService.disconnect(setConnected));
        socket.off('connection', () => SocketService.connection(setConnected));
        socket.off('queue::id', id => {
          if (!userId) SocketService.getId(id, setUserId);
        });
        socket.off('queue::all', data =>
          SocketService.fetchData(data, setData),
        );
        socket.disconnect();
      };
    }
  }, [socket]);

  useEffect(() => {
    const filteredData = data.filter(item => item._id === userId)[0];
    const ongoing = data
      .filter(item => item.status === 'Ongoing')
      .sort((a, b) => b.queueNumber - a.queueNumber)[0];
    setCurrentData(filteredData);
    setSize(data.length);
    setQueueNumber(filteredData?.queueNumber);
    setPatientOngoing(ongoing);
    setStatus(filteredData?.status);
    setLoading(false);
  }, [data]);

  return data && !currentData ? (
    <View style={styles.container}>
      <View style={styles.statusCard}>
        <Text style={styles.statusCard.subtitle}>Status</Text>
        <Text style={styles.statusCard.title}>Hindi ka nakapila.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.live}>live</Text>
        <Text style={styles.title}>Dami ng nakapila</Text>
        <Text style={styles.content}>{size}</Text>
      </View>
    </View>
  ) : (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.statusCard}>
          <Text style={styles.statusCard.subtitle}>Status</Text>
          <Text style={styles.statusCard.title}>
            {status === 'Ongoing' ? 'Your turn' : 'Waiting'}
          </Text>
          <Text style={styles.statusCard.subtitle}>
            Purpose: {currentData?.purpose}
          </Text>
          <Text style={styles.statusCard.subtitle}>
            {status === 'Waiting'
              ? interval(new Date(), currentData?.timeStarted)
              : status === 'Ongoing'
              ? interval(new Date(), patientOngoing?.timeServiced)
              : 0}
          </Text>
        </View>
        <View style={{...styles.card, ...styles.withFocus}}>
          <Text style={styles.live}>live</Text>
          <Text style={styles.title}>Ang iyong Queue Number</Text>
          <Text style={{...styles.content, ...styles.withFocus.text}}>
            #{queueNumber}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.live}>live</Text>
          <Text style={styles.title}>Kasalukuyang kinukonsulta</Text>
          <Text style={styles.content}>
            {patientOngoing ? `#${patientOngoing?.queueNumber}` : 'Wala'}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.live}>live</Text>
          <Text style={styles.title}>Dami ng nakapila</Text>
          <Text style={styles.content}>{size}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    padding: 20,
    backgroundColor: ColorTheme.background,
  },
  statusCard: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',

    title: {
      fontSize: 36,
      fontFamily: FontFamily.bold,
      color: ColorTheme.secondary,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: FontFamily.regular,
      color: ColorTheme.secondary,
    },
  },
  card: {
    width: '75%',
    height: 200,
    backgroundColor: ColorTheme.primary,
    borderRadius: 45,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: 20,
    color: ColorTheme.accent,
  },
  content: {
    fontSize: 75,
    fontFamily: FontFamily.black,
    color: ColorTheme.accent,
  },
  withFocus: {
    borderWidth: 10,
    borderColor: ColorTheme.success,
    text: {
      color: ColorTheme.success,
    },
  },
  live: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: ColorTheme.info,
    color: ColorTheme.accent,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontFamily: FontFamily.bold,
    fontSize: 13,
    borderBottomLeftRadius: 100,
  },
});
