import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
export default function AlertModal({title, is_error, error_messaage, visible, setVisible}) {
  return (
   
      <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
            {error_messaage}
        </Dialog.Description>
        {
            !is_error &&
                <Dialog.Button label="Cancel" onPress={setVisible} />
        }
        <Dialog.Button label="Ok" onPress={setVisible} />
      </Dialog.Container>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});