/** Trạng thái đơn hàng đồng bộ: Employee + Customer */
export const ORDER_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "delivering", label: "Delivering" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const ORDER_STATUS_LABELS = Object.fromEntries(
  ORDER_STATUSES.map((s) => [s.value, s.label])
);
