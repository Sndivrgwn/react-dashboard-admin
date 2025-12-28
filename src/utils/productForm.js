export const PRODUCT_STATUS_OPTIONS = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
  { value: "scheduled", label: "Scheduled" },
];

export const PRODUCT_VISIBILITY_OPTIONS = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "unlisted", label: "Unlisted" },
];

export const PRODUCT_CHANNEL_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

export const toTitle = (value) =>
  value
    ? value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "-";

export const shallowDiff = (next, prev) => {
  const changed = {};
  Object.keys(prev || {}).forEach((key) => {
    if (String(next?.[key] ?? "") !== String(prev?.[key] ?? "")) {
      changed[key] = next?.[key];
    }
  });
  return changed;
};

export const validateProductPayload = (payload) => {
  const errors = {};
  if ("name" in payload && !payload.name) {
    errors.name = "Name is required.";
  }
  if ("price" in payload) {
    if (payload.price === "" || payload.price === null) {
      errors.price = "Price is required.";
    } else if (Number(payload.price) < 0) {
      errors.price = "Price must be non-negative.";
    }
  }
  if ("stock_quantity" in payload) {
    if (payload.stock_quantity === "" || payload.stock_quantity === null) {
      errors.stock_quantity = "Stock is required.";
    } else if (Number(payload.stock_quantity) < 0) {
      errors.stock_quantity = "Stock must be non-negative.";
    }
  }
  ["weight_kg", "length_cm", "width_cm", "height_cm"].forEach((field) => {
    if (field in payload && payload[field] !== "" && Number(payload[field]) < 0) {
      errors[field] = "Value must be non-negative.";
    }
  });
  if ("status" in payload && !payload.status) {
    errors.status = "Status is required.";
  }
  if ("visibility" in payload && !payload.visibility) {
    errors.visibility = "Visibility is required.";
  }
  if ("channel" in payload && !payload.channel) {
    errors.channel = "Channel is required.";
  }
  if ("category_id" in payload && !payload.category_id) {
    errors.category_id = "Category is required.";
  }
  if ("brand_id" in payload && !payload.brand_id) {
    errors.brand_id = "Brand is required.";
  }
  return errors;
};
