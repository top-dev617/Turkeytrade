import {
  iStep1,
  iStep1Active,
  iStep2,
  iStep2Active,
  iStep3,
  iStep3Active,
  iStep4,
} from "../icons/icons";

export const business_types = [
  "Manufacturer",
  "Exporter",
  "Wholesaler",
  "Trading Company",
  "Distributor",
  "Service Provider",
];

export const store_stepper_data = [
  {
    id: 1,
    name: "Step 1",
    description: "Company description",
    active_icon: iStep1Active,
    icon: iStep1,
  },
  {
    id: 2,
    name: "Step 2",
    description: "Upload Logo",
    active_icon: iStep2Active,
    icon: iStep2,
  },
  {
    id: 3,
    name: "Step 3",
    description: "Upload Video Presentation",
    active_icon: iStep3Active,
    icon: iStep3,
  },
  {
    id: 4,
    name: "Step 4",
    description: "Overview",
    active_icon: iStep4,
    icon: iStep4,
  },
];
