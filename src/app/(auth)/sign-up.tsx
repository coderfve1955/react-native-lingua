import { useSignUp } from "@clerk/expo";
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

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) return;

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) return;

    setVerifyError(null);
    setIsVerifying(true);
  };

  const handleVerified = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setVerifyError(error.longMessage ?? error.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize();
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
            <Text className="text__heading--h1">Create your account</Text>
            <View className="flex-row items-center gap-1 pt-2">
              <Text className="text__body--sm">Start your language journey today</Text>
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
            {errors.fields.emailAddress && (
              <Text className="text__body--sm text-error">{errors.fields.emailAddress.message}</Text>
            )}
            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            {errors.fields.password && (
              <Text className="text__body--sm text-error">{errors.fields.password.message}</Text>
            )}
          </View>

          <View className="pt-6">
            <GradientButton
              label="Sign Up"
              onPress={handleSignUp}
              disabled={fetchStatus === "fetching"}
            />
          </View>

          {/* Required for sign-up bot protection; Clerk skips the browser captcha on iOS and Android */}
          <View nativeID="clerk-captcha" />

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
            <Text className="text__body--sm">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text__heading--h4 text-primary">Log in</Text>
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
