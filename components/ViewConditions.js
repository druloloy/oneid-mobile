import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import dateFormat, {dateFormatUnspecified} from '../utils/dateFormat';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../theme.config';

const {ColorTheme, FontFamily} = theme;
const ViewConditions = ({data, condition, closeModal}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{condition}</Text>
      <ScrollView style={styles.scrollView}>
        {data.items.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              {index === 0 ? <Text style={styles.latest}>latest</Text> : null}
              <Text style={styles.date}>{dateFormat(item.createdAt)}</Text>
              <Text style={styles.text}>{item.remarks}</Text>
              {item.treatments.filter(Boolean).length > 0 ? (
                <>
                  <Text style={styles.title}>Treatments:</Text>
                  <View style={styles.treatment}>
                    {item.treatments.filter(Boolean).map((treatment, index) => {
                      return (
                        <View key={index} style={styles.treatmentItem}>
                          <Text style={styles.treatmentText}>{treatment}</Text>
                        </View>
                      );
                    })}
                  </View>
                </>
              ) : null}
              <Text style={styles.title}>Prescriptions:</Text>
              {item.prescriptions.map((prescription, index) => {
                return (
                  <View key={index} style={styles.prescription}>
                    <View style={styles.prescriptionHeader}>
                      <Text style={styles.prescriptionName}>
                        {prescription.name}
                      </Text>
                      <Text style={styles.prescriptionDosage}>
                        {prescription.dosage}
                      </Text>
                    </View>
                    <Text style={styles.prescriptionEnding}>
                      {prescription.frequency}x a day until{' '}
                      {dateFormatUnspecified(prescription.duration)}
                    </Text>
                    <Text style={styles.prescriptionNotes}>
                      Notes: {prescription.notes ?? 'No notes'}
                    </Text>
                  </View>
                );
              })}

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Consulted by: {item.consultedBy.name}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.close} onPress={closeModal}>
        <Icon name="close" size={30} color={ColorTheme.backgroundColor} />
      </TouchableOpacity>
    </View>
  );
};

export default ViewConditions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorTheme.secondary,
    opacity: 0.925,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: FontFamily.black,
    fontSize: 24,
    color: ColorTheme.accent,
    backgroundColor: ColorTheme.primary,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    padding: 40,
  },
  card: {
    width: '100%',
    padding: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  date: {
    color: ColorTheme.background,
    fontFamily: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  text: {
    color: ColorTheme.background,
    fontFamily: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  title: {
    color: ColorTheme.accent,
    fontFamily: FontFamily.bold,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  treatment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  treatmentItem: {
    backgroundColor: ColorTheme.accent,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  treatmentText: {
    color: ColorTheme.info,
    fontFamily: FontFamily.bold,
    fontSize: 12,
  },
  prescription: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderLeftColor: ColorTheme.accent,
    borderLeftWidth: 5,
  },
  prescriptionHeader: {
    flexDirection: 'row',
  },
  prescriptionName: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: ColorTheme.background,
  },
  prescriptionDosage: {
    fontSize: 12,
    backgroundColor: ColorTheme.info,
    color: ColorTheme.accent,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    marginLeft: 5,
  },
  prescriptionNotes: {
    fontSize: 12,
    color: ColorTheme.accent,
    fontFamily: FontFamily.bold,
    marginTop: 5,
  },
  prescriptionEnding: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  latest: {
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
  close: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
