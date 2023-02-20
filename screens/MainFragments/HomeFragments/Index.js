import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import theme from '../../../theme.config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {StackActions} from '@react-navigation/native';
import AppointmentBox from '../../../components/AppointmentBox';
// import schedule from '../../../datasets/schedules';
import {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import UserService from '../../../services/UserService';
import {Modal} from 'react-native';
import moment from 'moment';
const {ColorTheme, FontFamily} = theme;

const Index = ({navigation}) => {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [appointmentModal, setAppointModal] = React.useState(false);
  const [schedule, setSchedule] = React.useState([]);

  const toProfile = () => {
    navigation.dispatch(StackActions.push('Profile'));
  };
  const toConsultations = () => {
    navigation.dispatch(StackActions.push('Consultations'));
  };
  const toPatientQueue = () => {
    navigation.dispatch(StackActions.push('PatientQueue'));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      await UserService.getAppointments()
        .then(res => {
          setAppointments(res.data.content);
        })
        .finally(() => setLoading(false));
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      await UserService.getSchedules()
        .then(res => {
          const data = res.data.content;
          const newData = data.map((item, index) => {
            const startTime = moment(item.startTime, 'HH:mm').format('hh:mm A');
            const endTime = moment(item.endTime, 'HH:mm').format('hh:mm A');

            return {
              id: item.id,
              day: item.day.substring(0, 3).toUpperCase(),
              time: `${startTime} - ${endTime}`,
              services: item.activities,
            };
          });

          setSchedule(newData);
        })
        .finally(() => setLoading(false));
    };

    fetchSchedules();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.servicesContainer}>
        <View style={styles.iconContainers}>
          <TouchableOpacity style={styles.box} onPress={toProfile}>
            <Icon
              name="user-astronaut"
              size={36}
              color={ColorTheme.secondary}
            />
            <Text style={styles.serviceName}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={toPatientQueue}>
            <Icon name="user-friends" size={36} color={ColorTheme.secondary} />
            <Text style={styles.serviceName}>Patient Queue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={toConsultations}>
            <Icon name="book-medical" size={36} color={ColorTheme.secondary} />
            <Text style={styles.serviceName}>Consultation</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Incoming Appointments */}
      <View style={styles.appointmentContainer}>
        <Text style={styles.appointmentTitle}>Mga Appointment</Text>
        {loading ? (
          <ActivityIndicator size="small" color={ColorTheme.primary} />
        ) : appointments.length > 0 ? (
          <>
            <AppointmentBox data={appointments[0]} />
            <TouchableOpacity
              style={styles.appointmentButton}
              onPress={() => setAppointModal(s => !s)}>
              <Text style={styles.appointmentButtonText}>Tignan lahat</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noAppointmentText}>
            Wala kang mga appointment sa ngayon.
          </Text>
        )}
      </View>

      {/* clinic schedules */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Schedule at Mga Serbisyo</Text>
        <View style={styles.scheduleBoxContainer}>
          {schedule.length > 0 &&
            schedule.map((item, index) => (
              <View key={index} style={styles.scheduleBox}>
                <View style={styles.scheduleBoxHeader}>
                  <Text style={styles.scheduleBoxDay}>{item.day}</Text>
                  <Text style={styles.scheduleBoxTime}>{item.time}</Text>
                </View>

                <View style={styles.scheduleBoxBody}>
                  {item.services.map((service, index) => (
                    <Text key={index} style={styles.scheduleBoxService}>
                      {service}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={appointmentModal}
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mga Appointment</Text>
            <ScrollView style={styles.modalScroll}>
              {appointments.map((item, index) => (
                <AppointmentBox key={index} data={item} />
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAppointModal(s => !s)}>
              <FAIcon name="close" size={24} color={ColorTheme.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: ColorTheme.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: FontFamily.bold,
    color: ColorTheme.primary,
  },
  appointmentContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    marginBottom: 10,
  },
  appointmentButton: {
    width: '100%',
    height: 40,
    backgroundColor: ColorTheme.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  appointmentButtonText: {
    color: ColorTheme.background,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  noAppointmentText: {
    color: ColorTheme.info,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  serviceName: {
    color: ColorTheme.primary,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
  },
  servicesContainer: {
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  iconContainers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  box: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    fontSize: 18,
    color: ColorTheme.primary,
  },
  scheduleContainer: {
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 50,
  },
  scheduleTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: ColorTheme.primary,
    marginBottom: 10,
  },
  scheduleBoxContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: ColorTheme.primary,
    borderRadius: 10,
    padding: 10,
  },
  scheduleBoxHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleBoxDay: {
    color: ColorTheme.accent,
    fontSize: 48,
    fontFamily: FontFamily.black,
  },
  scheduleBoxTime: {
    color: ColorTheme.accent,
    fontSize: 14,
  },
  scheduleBoxBody: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  scheduleBoxService: {
    color: ColorTheme.secondary,
    fontFamily: FontFamily.bold,
    fontSize: 12,
    borderRadius: 100,
    textAlign: 'center',
    backgroundColor: ColorTheme.accent,
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.925,
    backgroundColor: ColorTheme.accent,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalTitle: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.bold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalScroll: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: ColorTheme.accent,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Index;
