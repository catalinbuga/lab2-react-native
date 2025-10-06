import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useVote } from '../context/VoteContext';

export default function WelcomeScreen() {
  const { userName, setUserName, startTournament, setScreen } = useVote();
  const [localName, setLocalName] = useState(userName);

  const canStart = localName && localName.trim().length >= 2;

  const handleStart = () => {
    setUserName(localName.trim());
    startTournament();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Alege Bautura Ta</Text>
        <Text style={styles.subtitle}>Introdu numele tău pentru a începe selecția în perechi.</Text>

        <TextInput
          placeholder="Numele tău"
          value={localName}
          onChangeText={setLocalName}
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Pressable
          style={[styles.button, !canStart && styles.buttonDisabled]}
          disabled={!canStart}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Începe Clasamentul</Text>
        </Pressable>

        <Pressable style={styles.secondary} onPress={() => setScreen('stats')}>
          <Text style={styles.secondaryText}>Vezi statistici utilizatori</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1a6be0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a7c4f3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondary: {
    marginTop: 16,
  },
  secondaryText: {
    color: '#1a6be0',
    fontWeight: '600',
  },
});
