// app/(auth)/signup.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CheckboxRow from "../../components/CheckboxRow";
import DayCheck from "../../components/DayCheck";
import Section from "../../components/Section";
import { colors, radius, spacing } from "../../theme";

/* ----------------------------- Data sources ----------------------------- */
const ROLE_OPTIONS = [
  { label: "Driver", value: "driver" },
  { label: "Shop", value: "shop" },
] as const;

const SHOP_TYPE_OPTIONS = [
  "Repair and Vulcanizing", 
  "Repair only",
  "Vulcanizing only"
] as const;

const SHOP_LIST = [
  "AutoFix Argao",
  "QuickPatch Tire Shop",
  "Bohol Motors",
  "Cebu WrenchWorks",
  "RoadAid Service Center",
  "Shop not Listed",
] as const;

const SERVICES = [
  "Oil Change",
  "Engine Tune-up",
  "Brake Repair",
  "Transmission Service",
  "Wheel Alignment",
  "Tire Rotation",
  "Battery Replacement",
  "Electrical System Repair",
  "Suspension Repair",
  "Air Conditioning Service",
  "Exhaust System Repair",
  "Diagnostic Services",
  "Wheel Balancing",
  "Radiator Flush",
  "Fuel System Cleaning",
  "Belt and Hose Replacement",
  "Headlight Restoration",
  "Windshield Wiper Replacement",
  "Wheel Repair",
  "Vulcanizing/Tire Patching",
];

const DAY_LABELS = ["M", "T", "W", "Th", "F", "Sat", "Sun"];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/* ------------------------- Reusable tiny components ------------------------- */
function Select({
  label,
  value,
  placeholder,
  options,
  onSelect,
}: {
  label: string;
  value: string | null;
  placeholder?: string;
  // Accept readonly arrays to avoid TS2322 with `as const`
  options:
    | ReadonlyArray<string>
    | ReadonlyArray<{ label: string; value: string }>;
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const normalized = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  const selectedLabel =
    normalized.find((o) => o.value === value)?.label ?? value ?? "";

  return (
    <View style={{ gap: 6 }}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.selectBox}
        android_ripple={{ color: "#e5e7eb" }}
      >
        <Text
          numberOfLines={1}
          style={[styles.selectText, !value && { color: "#808080" }]}
        >
          {value ? selectedLabel : placeholder ?? "Select…"}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.subtext} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{label}</Text>
            <ScrollView style={{ maxHeight: 340 }}>
              {normalized.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(opt.value);
                    setOpen(false);
                  }}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ReadonlyArray<string>;
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: "row", gap: spacing(1), flexWrap: "wrap" }}>
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <Pressable
              key={opt}
              onPress={() => onChange(opt)}
              style={[styles.radioItem, checked && styles.radioItemActive]}
            >
              <View style={[styles.radioDot, checked && styles.radioDotActive]} />
              <Text style={[styles.radioText, checked && styles.radioTextActive]}>
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function FieldRow({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
}: {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.borderWrap}>
      <View style={styles.innerRow}>
        <Ionicons
          name={icon}
          size={18}
          color={colors.subtext}
          style={{ marginHorizontal: 8 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#808080"
          style={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

/* --------------------------------- Screen --------------------------------- */
export default function Signup() {
  // Role: initially null so only the role dropdown is visible
  const [role, setRole] = useState<"driver" | "shop" | null>(null);

  /* Driver fields */
  const [dFullname, setDFullname] = useState("");
  const [dEmail, setDEmail] = useState("");
  const [dPhone, setDPhone] = useState("");
  const [dPw, setDPw] = useState("");
  const [dCpw, setDCpw] = useState("");

  /* Shop fields */
  const [shopType, setShopType] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string | null>(null);
  const [showNotListedModal, setShowNotListedModal] = useState(false);
  const [locationPromptShown, setLocationPromptShown] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const [sFullname, setSFullname] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [certificateName, setCertificateName] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [sPw, setSPw] = useState("");
  const [sCpw, setSCpw] = useState("");

  const canDriverSubmit = useMemo(
    () =>
      dFullname.trim() &&
      dEmail.trim() &&
      dPhone.trim() &&
      dPw.length > 0 &&
      dPw === dCpw,
    [dFullname, dEmail, dPhone, dPw, dCpw]
  );

  const canShopSubmit = useMemo(
    () =>
      shopType &&
      shopName &&
      sFullname.trim() &&
      sEmail.trim() &&
      sPhone.trim() &&
      sPw.length > 0 &&
      sPw === sCpw,
    [shopType, shopName, sFullname, sEmail, sPhone, sPw, sCpw]
  );

  function toggleService(s: string) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }
  function toggleDay(k: string) {
    setDays((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 1) Always visible: Role dropdown */}
        <Section>
          <Select
            label="Select role"
            value={role}
            placeholder='Choose: "Driver" or "Shop"'
            options={ROLE_OPTIONS}
            onSelect={(val) => {
              if (val === "driver" || val === "shop") setRole(val);
            }}
          />
        </Section>

        {/* 2) DRIVER VIEW */}
        {role === "driver" && (
          <>
            <Section>
              <FieldRow
                icon="person-outline"
                placeholder="Full name"
                value={dFullname}
                onChangeText={setDFullname}
              />
              <FieldRow
                icon="mail-outline"
                placeholder="Email"
                value={dEmail}
                onChangeText={setDEmail}
                keyboardType="email-address"
              />
              <FieldRow
                icon="call-outline"
                placeholder="Phone Number"
                value={dPhone}
                onChangeText={setDPhone}
                keyboardType="phone-pad"
              />
              <FieldRow
                icon="lock-closed-outline"
                placeholder="Password"
                value={dPw}
                onChangeText={setDPw}
                secureTextEntry
              />
              <FieldRow
                icon="lock-closed-outline"
                placeholder="Confirm Password"
                value={dCpw}
                onChangeText={setDCpw}
                secureTextEntry
              />
            </Section>

            <Pressable
              onPress={() => {}}
              style={[styles.btnPrimary, !canDriverSubmit && styles.btnDisabled]}
              disabled={!canDriverSubmit}
            >
              <Text style={styles.btnPrimaryText}>Sign up</Text>
            </Pressable>
          </>
        )}

        {/* 3) SHOP VIEW */}
        {role === "shop" && (
          <>
            <Section>
               <Select
                label="Type of Shop"
                value={shopType}
                placeholder="Select type"
                options={SHOP_TYPE_OPTIONS}
                onSelect={setShopType}
              />
            </Section>

            <Section>
              <Select
                label="Shop"
                value={shopName}
                placeholder="Select your shop"
                options={SHOP_LIST}
                onSelect={(v) => {
                  if (v === "Shop not Listed") {
                    setShowNotListedModal(true);
                  }
                  setShopName(v);
                }}
              />

              {/* Location prompt (shown after modal OK) */}
              {locationPromptShown && (
                <View className="location-card" style={styles.locationCard}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={colors.primary}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.locationTitle}>
                      Location access required
                    </Text>
                    <Text style={styles.locationDesc}>
                      Turn on your device location to register your shop at your
                      current address.
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setLocationEnabled((v) => !v)}
                    style={[
                      styles.btnOutline,
                      locationEnabled && { borderColor: "#16a34a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.btnOutlineText,
                        locationEnabled && { color: "#16a34a" },
                      ]}
                    >
                      {locationEnabled ? "Enabled ✓" : "Enable Location"}
                    </Text>
                  </Pressable>
                </View>
              )}
            </Section>

            <Section>
              <FieldRow
                icon="person-outline"
                placeholder="Full name"
                value={sFullname}
                onChangeText={setSFullname}
              />
              <FieldRow
                icon="mail-outline"
                placeholder="Email"
                value={sEmail}
                onChangeText={setSEmail}
                keyboardType="email-address"
              />
              <FieldRow
                icon="call-outline"
                placeholder="Phone Number"
                value={sPhone}
                onChangeText={setSPhone}
                keyboardType="phone-pad"
              />
            </Section>

            <Section title="Upload Certificates / Proof of Business">
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing() }}>
                <Pressable
                  onPress={() => setCertificateName("certificate.jpg")}
                  style={styles.btnLight}
                >
                  <Text style={styles.btnLightText}>Choose File</Text>
                </Pressable>
                {certificateName && (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: colors.primary,
                      fontStyle: "italic",
                      flexShrink: 1,
                    }}
                  >
                    {certificateName}
                  </Text>
                )}
              </View>
            </Section>

            <Section title="Services Offered">
              <ScrollView style={{ maxHeight: 250 }}>
                <View style={{ gap: spacing(0.75) }}>
                  {SERVICES.map((s) => (
                    <CheckboxRow
                      key={s}
                      label={s}
                      checked={services.includes(s)}
                      onToggle={() => toggleService(s)}
                    />
                  ))}
                </View>
              </ScrollView>
            </Section>

            <Section title="Shop Schedule">
              <Text style={styles.smallTitle}>Days</Text>
              <View style={styles.daysGrid}>
                {DAY_LABELS.map((label, i) => (
                  <DayCheck
                    key={label}
                    label={label}
                    checked={days.includes(DAY_KEYS[i])}
                    onToggle={() => toggleDay(DAY_KEYS[i])}
                  />
                ))}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing() }}>
                <Text style={{ color: colors.text }}>Hours:</Text>
                <View style={styles.timeBox}>
                  <TextInput
                    value={openTime}
                    onChangeText={setOpenTime}
                    placeholder="08:00"
                    placeholderTextColor="#808080"
                    style={styles.timeInput}
                  />
                </View>
                <Text style={{ color: colors.text }}>to</Text>
                <View style={styles.timeBox}>
                  <TextInput
                    value={closeTime}
                    onChangeText={setCloseTime}
                    placeholder="22:00"
                    placeholderTextColor="#808080"
                    style={styles.timeInput}
                  />
                </View>
              </View>
            </Section>

            <Section>
              <FieldRow
                icon="lock-closed-outline"
                placeholder="Password"
                value={sPw}
                onChangeText={setSPw}
                secureTextEntry
              />
              <FieldRow
                icon="lock-closed-outline"
                placeholder="Confirm Password"
                value={sCpw}
                onChangeText={setSCpw}
                secureTextEntry
              />
            </Section>

            <Pressable
              onPress={() => {}}
              style={[styles.btnPrimary, !canShopSubmit && styles.btnDisabled]}
              disabled={!canShopSubmit}
            >
              <Text style={styles.btnPrimaryText}>Continue</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      {/* Modal: Shop not Listed reminder */}
      <Modal visible={showNotListedModal} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Reminder</Text>
            <Text style={styles.dialogText}>
              Make sure you are in your Shop's Location to be able to Register your Shop.
            </Text>
            <View style={styles.dialogRow}>
              <Pressable
                onPress={() => {
                  setShowNotListedModal(false);
                  setLocationPromptShown(false);
                  setLocationEnabled(false);
                }}
                style={styles.btnGhost}
              >
                <Text style={styles.btnGhostText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowNotListedModal(false);
                  setLocationPromptShown(true);
                }}
                style={styles.btnPrimary}
              >
                <Text style={styles.btnPrimaryText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* --------------------------------- Styles --------------------------------- */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing(3), gap: spacing(1.5) },

  label: { color: colors.subtext, fontSize: 12, marginLeft: 4 },

  /* Select */
  selectBox: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.sm,
    paddingVertical: spacing(1.25),
    paddingHorizontal: spacing(1.25),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: { color: "#000", fontSize: 14 },

  /* Modal for Select */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: spacing(2),
    justifyContent: "center",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing(2),
  },
  modalTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing(1),
  },
  optionRow: {
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(1),
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  optionText: { color: colors.text, fontSize: 14 },

  /* Radio */
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing(1.25),
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    backgroundColor: "#F9FAFB",
  },
  radioItemActive: {
    backgroundColor: "#0E1B33",
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.subtext,
  },
  radioDotActive: { borderColor: "#fff", backgroundColor: "#fff" },
  radioText: { color: colors.subtext, fontWeight: "700", fontSize: 13 },
  radioTextActive: { color: "#fff" },

  /* Input rows */
  borderWrap: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: radius.sm,
    padding: 5,
    marginBottom: spacing(1.25),
  },
  innerRow: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    paddingVertical: spacing(1.25),
    paddingHorizontal: spacing(1.25),
    color: "#000",
    fontSize: 14,
  },

  /* Services & schedule */
  smallTitle: { color: colors.text, fontWeight: "700", marginBottom: spacing(0.5) },
  daysGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing(1.25), marginBottom: spacing(1) },
  timeBox: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.sm,
    paddingHorizontal: spacing(1),
  },
  timeInput: {
    minWidth: 90,
    paddingVertical: 8,
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },

  /* Location prompt */
  locationCard: {
    marginTop: spacing(1.25),
    gap: spacing(0.5),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.sm,
    padding: spacing(1.25),
    backgroundColor: "#F8FAFF",
  },
  locationTitle: { color: colors.text, fontWeight: "700" },
  locationDesc: { color: colors.subtext, fontSize: 12 },

  /* Buttons */
  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing(1.25),
    alignItems: "center",
    marginTop: spacing(0.5),
  },
  btnPrimaryText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  btnDisabled: { opacity: 0.5 },

  btnLight: {
    backgroundColor: "#CCCCCC",
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(1.5),
    borderRadius: radius.sm,
  },
  btnLightText: { color: "#000", fontWeight: "600" },

  btnOutline: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: spacing(1),
  },
  btnOutlineText: { color: colors.text, fontWeight: "700", fontSize: 12 },

  /* Dialog */
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing(2),
  },
  dialog: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: radius.md,
    padding: spacing(2),
    borderWidth: 1,
    borderColor: colors.line,
  },
  dialogTitle: { color: colors.text, fontWeight: "800", fontSize: 16, marginBottom: spacing(1) },
  dialogText: { color: colors.text, marginBottom: spacing(1.5) },
  dialogRow: { flexDirection: "row", justifyContent: "flex-end", gap: spacing(1) },
  btnGhost: {
    paddingVertical: 10,
    paddingHorizontal: spacing(1.25),
    borderRadius: radius.sm,
    backgroundColor: "#f3f4f6",
  },
  btnGhostText: { color: colors.text, fontWeight: "700" },
});
