import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  error?: string | null;
  onClose: () => void;
  onVerified: (code: string) => void;
};

export function VerificationModal({
  visible,
  email,
  error,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [lastError, setLastError] = useState(error);
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  if (error !== lastError) {
    setLastError(error);
    if (error) {
      setCode("");
    }
  }

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  const handleShow = () => {
    setCode("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleChangeCode = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) {
      onVerified(digits);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={handleShow}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Pressable className="flex-1 bg-black/40" onPress={onClose} />

        <View
          className="rounded-t-3xl bg-white px-6 pt-6"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="mb-6 h-1 w-10 self-center rounded-full bg-border" />

          <Text className="text__heading--h3 text-center">Verify your email</Text>
          <Text className="text__body--sm pb-6 pt-2 text-center">
            Enter the 6-digit code we sent to{"\n"}
            <Text className="text__body--md">{email}</Text>
          </Text>

          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="flex-row justify-center gap-2"
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <View
                key={index}
                className={`h-14 w-11 items-center justify-center rounded-2xl border bg-surface ${
                  index === code.length ? "border-primary" : "border-border"
                }`}
              >
                <Text className="text__heading--h3">{code[index] ?? ""}</Text>
              </View>
            ))}
          </Pressable>

          {error && (
            <Text className="text__body--sm pt-4 text-center text-error">{error}</Text>
          )}

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChangeCode}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
