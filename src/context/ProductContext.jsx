import { createContext, useContext, useMemo, useState } from "react";
import { createProduct } from "../services/Product";
import colorData from "../dataset/color/color.json";

const ProductContext = createContext(null);

const initialForm = {
  category_id: "",
  brand_id: "",
  name: "",
  color: "",
  weight_kg: "",
  length_cm: "",
  width_cm: "",
  description: "",
  price: "",
  stock_quantity: "",
  availability_status: "in_stock",
  visibility: "public",
  channel: "online",
  status: "published",
  scheduled_at: "",
  SKU: "",
};

const colorMap = colorData.reduce((acc, item) => {
  acc[item.hex.toLowerCase()] = item.name;
  return acc;
}, {});

const generateSku = (nameValue, colorValue) => {
  const namePart = (nameValue || "PRODUCT")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.slice(0, 3).toUpperCase())
    .join("");
  const colorName = colorMap[(colorValue || "").toLowerCase()] || "COLOR";
  const now = new Date();
  const datePart = `${String(now.getDate()).padStart(2, "0")}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getFullYear()).slice(-2)}`;
  const timePart = `${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
  return `${namePart}-${colorName.toUpperCase()}-${datePart}-${timePart}`;
};

export function ProductProvider({ children }) {
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [scheduleOption, setScheduleOption] = useState("Immediately");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setVisibility = (isPublic) => {
    updateField("visibility", isPublic ? "public" : "private");
  };

  const setChannel = (value) => {
    updateField("channel", value);
  };

  const setAvailability = (value) => {
    updateField("availability_status", value);
  };

  const setSchedule = (value) => {
    setScheduleOption(value);
    if (value === "Schedule") {
      updateField("status", "scheduled");
      setIsScheduleOpen(true);
      return;
    }
    if (value === "Draft only") {
      updateField("status", "draft");
      updateField("scheduled_at", "");
      return;
    }
    updateField("status", "published");
    updateField("scheduled_at", "");
  };

  const setScheduleDateTime = (dateValue, timeValue) => {
    setScheduleDate(dateValue);
    setScheduleTime(timeValue);
    if (dateValue && timeValue) {
      updateField("scheduled_at", `${dateValue}T${timeValue}`);
    } else {
      updateField("scheduled_at", "");
    }
  };

  const submitProduct = async ({ statusOverride } = {}) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const payload = new FormData();
      const status =
        statusOverride ||
        (scheduleOption === "Draft only" ? "draft" : form.status);

      if (status === "scheduled" && !form.scheduled_at) {
        setErrorMessage("Please select a schedule date and time.");
        setIsSubmitting(false);
        return;
      }

      payload.append("category_id", form.category_id);
      payload.append("brand_id", form.brand_id);
      payload.append("name", form.name);
      const sku = form.SKU || generateSku(form.name, form.color);
      payload.append("SKU", sku);
      payload.append("color", form.color);
      payload.append("price", form.price);
      payload.append("stock_quantity", form.stock_quantity);
      payload.append("availability_status", form.availability_status);
      payload.append("visibility", form.visibility);
      payload.append("channel", form.channel);
      payload.append("status", status);

      if (form.weight_kg) payload.append("weight_kg", form.weight_kg);
      if (form.length_cm) payload.append("length_cm", form.length_cm);
      if (form.width_cm) payload.append("width_cm", form.width_cm);
      if (form.description) payload.append("description", form.description);
      if (status === "scheduled") {
        payload.append("scheduled_at", form.scheduled_at);
      }
      if (images.length) {
        images.slice(0, 5).forEach((file) => payload.append("images[]", file));
      }

      await createProduct(payload);
      setSuccessMessage("Product created successfully.");
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      const apiErrors = error?.response?.data?.errors;
      const fieldErrors = apiErrors
        ? Object.values(apiErrors).flat().filter(Boolean)
        : [];
      setErrorMessage(
        apiMessage || fieldErrors[0] || "Unable to create product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = useMemo(
    () => ({
      form,
      images,
      scheduleOption,
      scheduleDate,
      scheduleTime,
      isScheduleOpen,
      isSubmitting,
      errorMessage,
      successMessage,
      updateField,
      setImages,
      setVisibility,
      setChannel,
      setAvailability,
      setSchedule,
      setScheduleDateTime,
      setIsScheduleOpen,
      submitProduct,
      setScheduleDate,
      setScheduleTime,
    }),
    [
      form,
      images,
      scheduleOption,
      scheduleDate,
      scheduleTime,
      isScheduleOpen,
      isSubmitting,
      errorMessage,
      successMessage,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductForm() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductForm must be used within ProductProvider");
  }
  return context;
}
