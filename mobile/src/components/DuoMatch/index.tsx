import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ onClose, discord, ...rest }: DuoMatchProps) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para você colar no Discord!"
    );
    setIsCopying(false);
  }

  return (
    <Modal statusBarTranslucent transparent animationType='fade' {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />

          <Heading
            title="Let's play!"
            subtitle='Agora é só começar a jogar!'
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione seu Discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordUserToClipboard}
            style={styles.discordButton}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
