import { useSignIn } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "@/components/AuthInput";
import { GradientButton } from "@/components/GradientButton";
import { SocialAuthButton } from "@/components/SocialAuthButton";
import { VerificationModal } from "@/components/VerificationModal";
import { AppleIcon, ChevronLeftIcon, FacebookIcon, GoogleIcon, SparkleIcon } from "@/components/icons";
import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleSignIn = async () => {
    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    if (error) return;

    setVerifyError(null);
    setIsVerifying(true);
  };

  const handleVerified = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      setVerifyError(error.longMessage ?? error.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize();
      setIsVerifying(false);
      router.replace("/");
    }
  };

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity className="pt-2" hitSlop={12} onPress={() => router.back()}>
            <ChevronLeftIcon />
          </TouchableOpacity>

          <View className="pt-6">
            <Text className="text__heading--h1">Welcome back</Text>
            <View className="flex-row items-center gap-1 pt-2">
              <Text className="text__body--sm">Continue your language journey</Text>
              <SparkleIcon size={14} />
            </View>
          </View>

          <View className="relative items-center py-8">
            <View className="absolute left-[14%] top-0">
              <SparkleIcon size={18} color={colors.semantic.streak} />
            </View>
            <View className="absolute right-[16%] top-2">
              <SparkleIcon size={14} color={colors.brand.blue} />
            </View>
            <View className="absolute bottom-2 right-[8%]">
              <SparkleIcon size={12} color={colors.semantic.streak} />
            </View>
            <Image
              source={images.mascotAuth}
              style={{ width: "100%", height: 170 }}
              resizeMode="contain"
            />
          </View>

          <View className="gap-3">
            <AuthInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              keyboardType="email-address"
            />
            {errors.fields.identifier && (
              <Text className="text__body--sm text-error">{errors.fields.identifier.message}</Text>
            )}
          </View>

          <View className="pt-6">
            <GradientButton
              label="Sign In"
              onPress={handleSignIn}
              disabled={fetchStatus === "fetching"}
            />
          </View>

          <View className="flex-row items-center gap-3 py-6">
            <View className="h-px flex-1 bg-border" />
            <Text className="text__caption">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="gap-3">
            <SocialAuthButton
              icon={<GoogleIcon />}
              label="Continue with Google"
              onPress={() => handleSocialAuth("oauth_google")}
            />
            <SocialAuthButton
              icon={<FacebookIcon />}
              label="Continue with Facebook"
              onPress={() => handleSocialAuth("oauth_facebook")}
            />
            <SocialAuthButton
              icon={<AppleIcon />}
              label="Continue with Apple"
              onPress={() => handleSocialAuth("oauth_apple")}
            />
          </View>

          <View className="flex-1 flex-row items-end justify-center gap-1 pb-6 pt-8">
            <Text className="text__body--sm">Don&apos;t have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="text__heading--h4 text-primary">Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerifying}
        email={email || "your email"}
        error={verifyError}
        onClose={() => setIsVerifying(false)}
        onVerified={handleVerified}
      />
    </SafeAreaView>
  );
}
