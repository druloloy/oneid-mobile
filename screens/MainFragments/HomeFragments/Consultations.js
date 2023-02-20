import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import UserService from '../../../services/UserService';
import timeSince from '../../../utils/timeSince';
import {ScrollView} from 'react-native';

import theme from '../../../theme.config';
import grouper from '../../../utils/grouper';
import ConditionBox from '../../../components/ConditionBox';
import {Modal} from 'react-native';
import ViewConditions from '../../../components/ViewConditions';

const {ColorTheme, FontFamily} = theme;

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [condition, setCondition] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [lastConsultation, setLastConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  const showConditions = condition => {
    setCondition(condition);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    UserService.getConsultations().then(res => {
      setLoading(false);
      const c = res.data.content.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const grouped = grouper(c);
      setLastConsultation(c[0]);
      const sortedGrouped = [...grouped].sort(
        (a, b) => b.latestUpdate - a.latestUpdate,
      );
      setConsultations(grouped);
    });
  }, []);

  return !loading ? (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.latestCard}>
          {consultations.length > 0 ? (
            <>
              <Text style={styles.latestSmallText}>
                Ang huling consultation mo ay
              </Text>
              <Text style={styles.latestLargeText}>
                {timeSince(new Date(lastConsultation.createdAt))}
              </Text>
              <Text style={styles.latestSmallText}>na ang nakalipas.</Text>
            </>
          ) : (
            <></>
          )}
        </View>

        <Text style={styles.title}>Mga Consultation</Text>

        {consultations.length > 0 ? (
          consultations.map((c, i) => (
            <ConditionBox
              key={i}
              data={c}
              showConditions={() => showConditions(c)}
            />
          ))
        ) : (
          <Text style={styles.latestSmallText}>Walang record.</Text>
        )}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <ViewConditions
            data={condition}
            condition={condition.condition}
            closeModal={closeModal}
          />
        </Modal>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={ColorTheme.primary} />
    </View>
  );
};

export default Consultations;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: ColorTheme.primary,
    marginBottom: 20,
  },
  latestCard: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: ColorTheme.primary,
    borderBottomWidth: 2,
  },
  latestSmallText: {
    color: ColorTheme.secondary,
    fontFamily: FontFamily.bold,
    fontSize: 16,
    textAlign: 'center',
  },
  latestLargeText: {
    color: ColorTheme.primary,
    fontFamily: FontFamily.black,
    fontSize: 48,
    textAlign: 'center',
    borderRadius: 100,
  },
});
