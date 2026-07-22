import {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function VibeCheckModal({visible, sendThanks}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={sendThanks}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                
              <Text style={styles.modalText}>Vibe Check 🌀</Text>
              <Text style={styles.modalText}>Your co-pilot is checking in.</Text>
              <Text style={styles.modalText}>Your co-piolot is checking in. They might have noticed a Snap you just sent or posted and wanted to give you a gentle heads-up.</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={sendThanks}>
                <Text style={styles.textStyle}>Send Thanks</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Keep Snapping</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>See Flagged Snaps</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => visible = true}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

