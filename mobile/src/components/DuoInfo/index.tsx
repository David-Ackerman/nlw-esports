import { ColorValue, Text, View } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

interface DuoInfoProsp {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function DuoInfo({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: DuoInfoProsp) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.info, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
