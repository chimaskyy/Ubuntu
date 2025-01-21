
export const shippingZones = [
  {
    name: "Enugu",
    states: ["Enugu"],
    fee: 0,
  },
  {
    name: "South East",
    states: ["Abia", "Anambra", "Ebonyi", "Imo"],
    fee: 2000,
  },
  {
    name: "South South",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    fee: 3000,
  },
  {
    name: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    fee: 2500,
  },
  {
    name: "North Central",
    states: [
      "Benue",
      "Federal Capital Territory",
      "Kogi",
      "Kwara",
      "Nasarawa",
      "Niger",
      "Plateau",
    ],
    fee: 3500,
  },
  {
    name: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    fee: 4000,
  },
  {
    name: "North West",
    states: [
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Sokoto",
      "Zamfara",
    ],
    fee: 4000,
  },
];

export function getShippingFee(state) {
  const zone = shippingZones.find((zone) => zone.states.includes(state));
  return zone?.fee ?? 0;
}

export function getStatesByZone(zoneName) {
  const zone = shippingZones.find((z) => z.name === zoneName);
  return zone?.states ?? [];
}

export function getAllStates() {
  return shippingZones.flatMap((zone) => zone.states).sort();
}
