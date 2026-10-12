import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COURSES } from "../types";

export type MenuFormValues = {
  name: string;
  description: string;
  course: string;
  price: string;
};

type FormErrors = Partial<Record<keyof MenuFormValues, string>>;

type MenuFormProps = {
  onAdd: (values: MenuFormValues) => void;
  onChange: () => void;
  confirmation: string;
};

const initialValues: MenuFormValues = {
  name: "",
  description: "",
  course: "",
  price: "",
};

export function MenuForm({
  onAdd,
  onChange,
  confirmation,
}: MenuFormProps) {
  const [values, setValues] = useState<MenuFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [coursePickerOpen, setCoursePickerOpen] = useState(false);

  function updateValue(field: keyof MenuFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    onChange();
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    const trimmedPrice = values.price.trim();
    const isDecimalPrice = /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(trimmedPrice);
    const numericPrice = Number(trimmedPrice);

    if (!values.name.trim()) {
      nextErrors.name = "Please enter a dish name.";
    }
    if (!values.description.trim()) {
      nextErrors.description = "Please enter a description.";
    }
    if (!COURSES.some((course) => course === values.course)) {
      nextErrors.course = "Please select a course.";
    }
    if (
      !isDecimalPrice ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      nextErrors.price = "Please enter a valid price greater than zero.";
    }

    return nextErrors;
  }

  function handleSubmit() {
    onChange();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onAdd(values);
    setValues(initialValues);
    setErrors({});
    setCoursePickerOpen(false);
  }

  return (
    <View style={styles.card}>
      <View style={styles.formHeading}>
        <Text style={styles.formTitle}>Add a dish</Text>
        <Text style={styles.requiredHint}>All fields required</Text>
      </View>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        accessibilityLabel="Dish Name"
        accessibilityHint="Enter the name of the dish"
        value={values.name}
        onChangeText={(value) => updateValue("name", value)}
        placeholder="e.g. Herb-crusted hake"
        placeholderTextColor="#9A9F96"
        style={[styles.input, errors.name ? styles.inputError : undefined]}
        returnKeyType="next"
        maxLength={80}
      />
      {errors.name ? <FieldError message={errors.name} /> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        accessibilityLabel="Description"
        accessibilityHint="Enter a short description of the dish"
        value={values.description}
        onChangeText={(value) => updateValue("description", value)}
        placeholder="Describe the ingredients or flavours"
        placeholderTextColor="#9A9F96"
        style={[
          styles.input,
          styles.descriptionInput,
          errors.description ? styles.inputError : undefined,
        ]}
        multiline
        textAlignVertical="top"
        maxLength={300}
      />
      {errors.description ? (
        <FieldError message={errors.description} />
      ) : null}

      <Text style={styles.label}>Course</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Course${values.course ? `, ${values.course}` : ""}`}
        accessibilityHint="Choose a menu course"
        accessibilityState={{ expanded: coursePickerOpen }}
        onPress={() => {
          setCoursePickerOpen((open) => !open);
          setErrors((current) => ({ ...current, course: undefined }));
          onChange();
        }}
        style={[
          styles.select,
          errors.course ? styles.inputError : undefined,
        ]}
      >
        <Text style={values.course ? styles.selectValue : styles.placeholder}>
          {values.course || "Select a course"}
        </Text>
        <Text style={styles.chevron}>{coursePickerOpen ? "⌃" : "⌄"}</Text>
      </Pressable>
      {coursePickerOpen ? (
        <View style={styles.options}>
          {COURSES.map((course) => (
            <Pressable
              key={course}
              accessibilityRole="button"
              onPress={() => {
                updateValue("course", course);
                setCoursePickerOpen(false);
              }}
              style={[
                styles.option,
                values.course === course ? styles.selectedOption : undefined,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  values.course === course
                    ? styles.selectedOptionText
                    : undefined,
                ]}
              >
                {course}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {errors.course ? <FieldError message={errors.course} /> : null}

      <Text style={styles.label}>Price</Text>
      <View
        style={[
          styles.priceInputWrap,
          errors.price ? styles.inputError : undefined,
        ]}
      >
        <Text style={styles.currency}>R</Text>
        <TextInput
          accessibilityLabel="Price in South African rand"
          accessibilityHint="Enter a price greater than zero"
          value={values.price}
          onChangeText={(value) => updateValue("price", value)}
          placeholder="0.00"
          placeholderTextColor="#9A9F96"
          style={styles.priceInput}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      {errors.price ? <FieldError message={errors.price} /> : null}

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.addButton,
          pressed ? styles.addButtonPressed : undefined,
        ]}
      >
        <Text style={styles.addButtonText}>＋  Add Menu Item</Text>
      </Pressable>
      {confirmation ? (
        <Text accessibilityRole="alert" style={styles.confirmation}>
          ✓ {confirmation}
        </Text>
      ) : null}
    </View>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <Text accessibilityRole="alert" style={styles.errorText}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E7EAE2",
    shadowColor: "#18392B",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  formHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    color: "#18392B",
    fontSize: 19,
    fontWeight: "700",
  },
  requiredHint: {
    color: "#778073",
    fontSize: 12,
  },
  label: {
    color: "#303830",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 7,
  },
  input: {
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE1D8",
    borderRadius: 11,
    paddingHorizontal: 13,
    color: "#202820",
    fontSize: 15,
  },
  descriptionInput: {
    height: 88,
    paddingTop: 12,
    paddingBottom: 12,
  },
  inputError: {
    borderColor: "#C84D42",
    borderWidth: 1.5,
  },
  select: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE1D8",
    borderRadius: 11,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#9A9F96",
    fontSize: 15,
  },
  selectValue: {
    color: "#202820",
    fontSize: 15,
  },
  chevron: {
    color: "#527A52",
    fontSize: 21,
    lineHeight: 24,
  },
  options: {
    borderWidth: 1,
    borderColor: "#DCE1D8",
    borderRadius: 11,
    marginTop: 6,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  option: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0EB",
  },
  selectedOption: {
    backgroundColor: "#EEF3EA",
  },
  optionText: {
    color: "#303830",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#18392B",
    fontWeight: "700",
  },
  priceInputWrap: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCE1D8",
    borderRadius: 11,
    paddingLeft: 13,
    backgroundColor: "#FFFFFF",
  },
  currency: {
    color: "#527A52",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    height: "100%",
    paddingRight: 13,
    color: "#202820",
    fontSize: 15,
  },
  errorText: {
    color: "#B33D35",
    fontSize: 12,
    marginTop: 5,
  },
  addButton: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#527A52",
    borderRadius: 12,
    marginTop: 22,
  },
  addButtonPressed: {
    backgroundColor: "#406640",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  confirmation: {
    color: "#28704A",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
});
