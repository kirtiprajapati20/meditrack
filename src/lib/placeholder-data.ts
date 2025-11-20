import { PlaceHolderImages } from "./placeholder-images";

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastAppointment: string;
  status: 'In Patient' | 'Out Patient';
  avatarUrl: string;
  location: string;
};

export const patients: Patient[] = [
  { id: 'PT001', name: 'John Doe', age: 45, gender: 'Male', lastAppointment: '2024-07-10', status: 'Out Patient', avatarUrl: PlaceHolderImages[0].imageUrl, location: 'California' },
  { id: 'PT002', name: 'Jane Smith', age: 34, gender: 'Female', lastAppointment: '2024-07-12', status: 'In Patient', avatarUrl: PlaceHolderImages[1].imageUrl, location: 'Texas' },
  { id: 'PT003', name: 'Mike Johnson', age: 56, gender: 'Male', lastAppointment: '2024-06-20', status: 'Out Patient', avatarUrl: PlaceHolderImages[2].imageUrl, location: 'Florida' },
  { id: 'PT004', name: 'Emily Davis', age: 29, gender: 'Female', lastAppointment: '2024-07-05', status: 'In Patient', avatarUrl: PlaceHolderImages[3].imageUrl, location: 'New York' },
  { id: 'PT005', name: 'Chris Lee', age: 62, gender: 'Male', lastAppointment: '2024-05-15', status: 'Out Patient', avatarUrl: PlaceHolderImages[4].imageUrl, location: 'Chicago' },
  { id: 'PT006', name: 'Bessie Cooper', age: 48, gender: 'Female', lastAppointment: '2024-07-01', status: 'Out Patient', avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8fDE3NjM0NDQ2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", location: 'Texas' },
  { id: 'PT007', name: 'Courtney Henry', age: 35, gender: 'Female', lastAppointment: '2024-07-02', status: 'In Patient', avatarUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8fDE3NjM0NDQ2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", location: 'Florida' },
];


export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Scheduled' | 'Ongoing';
  condition?: string;
  treatmentPlan?: string;
};

export const appointments: Appointment[] = [
  { id: 'APT001', patientName: 'Jane Smith', doctorName: 'Dr. Wilson', time: '10:00 AM', date: '2024-07-25', status: 'Upcoming' },
  { id: 'APT002', patientName: 'John Doe', doctorName: 'Dr. Adams', time: '11:30 AM', date: '2024-07-25', status: 'Upcoming' },
  { id: 'APT003', patientName: 'Emily Davis', doctorName: 'Dr. Wilson', time: '02:00 PM', date: '2024-07-26', status: 'Upcoming' },
  { id: 'APT004', patientName: 'John Doe', doctorName: 'Dr. Evelyn Reed', time: '09:00 AM', date: '2025-04-22', status: 'Scheduled', condition: 'Arrhythmia', treatmentPlan: 'Medication + Monitoring' },
  { id: 'APT005', patientName: 'Jane Smith', doctorName: 'Dr. Evelyn Reed', time: '07:38 AM', date: '2025-02-12', status: 'Completed', condition: 'Coronary Artery Disease', treatmentPlan: 'Angioplasty' },
  { id: 'APT006', patientName: 'Bessie Cooper', doctorName: 'Dr. Evelyn Reed', time: '01:34 PM', date: '2024-12-07', status: 'Scheduled', condition: 'Hypertension', treatmentPlan: 'Lifestyle + Drugs' },
  { id: 'APT007', patientName: 'Courtney Henry', doctorName: 'Dr. Evelyn Reed', time: '01:55 PM', date: '2024-11-22', status: 'Ongoing', condition: 'Valve Disorder', treatmentPlan: 'Surgery' },
];

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

export const inventory: InventoryItem[] = [
  { id: 'INV001', name: 'Sterile Gloves (Box)', sku: 'SG-100', quantity: 50, reorderLevel: 20, status: 'In Stock' },
  { id: 'INV002', name: 'Ibuprofen 200mg', sku: 'IBU-200', quantity: 15, reorderLevel: 25, status: 'Low Stock' },
  { id: 'INV003', name: 'Syringes 10ml (Box)', sku: 'SYR-10', quantity: 100, reorderLevel: 50, status: 'In Stock' },
  { id: 'INV004', name: 'Band-Aids (Box)', sku: 'BND-50', quantity: 0, reorderLevel: 30, status: 'Out of Stock' },
  { id: 'INV005', name: 'Saline Solution 500ml', sku: 'SAL-500', quantity: 35, reorderLevel: 40, status: 'Low Stock' },
];

export type Invoice = {
  id: string;
  patientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
};

export const invoices: Invoice[] = [
  { id: 'INV-2024-001', patientName: 'John Doe', amount: 250.00, status: 'Paid', dueDate: '2024-07-25' },
  { id: 'INV-2024-002', patientName: 'Jane Smith', amount: 150.50, status: 'Pending', dueDate: '2024-08-11' },
  { id: 'INV-2024-003', patientName: 'Mike Johnson', amount: 750.00, status: 'Overdue', dueDate: '2024-07-05' },
  { id: 'INV-2024-004', patientName: 'Emily Davis', amount: 55.00, status: 'Pending', dueDate: '2024-08-01' },
];

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Nurse';
  avatarUrl: string;
};

export const users: User[] = [
  { id: 'USR001', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@meditrack.com', role: 'Doctor', avatarUrl: PlaceHolderImages[5].imageUrl },
  { id: 'USR002', name: 'Markus Chen', email: 'markus.chen@meditrack.com', role: 'Admin', avatarUrl: PlaceHolderImages[6].imageUrl },
  { id: 'USR003', name: 'Aisha Khan', email: 'aisha.khan@meditrack.com', role: 'Nurse', avatarUrl: PlaceHolderImages[7].imageUrl },
  { id: 'USR004', name: 'Dr. Ben Carter', email: 'ben.carter@meditrack.com', role: 'Doctor', avatarUrl: PlaceHolderImages[8].imageUrl },
];

export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  status: 'Active' | 'On-leave';
  avatarUrl: string;
  phone: string;
  email: string;
  address: string;
};

export const doctors: Doctor[] = [
    { id: 'DOC001', name: 'Dr. Evelyn Reed', speciality: 'Cardiologist', status: 'Active', avatarUrl: PlaceHolderImages[5].imageUrl, phone: '(217) 555-0113', email: 'evelyn.reed@meditrack.com', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063' },
    { id: 'DOC002', name: 'Dr. Ben Carter', speciality: 'Pediatrician', status: 'Active', avatarUrl: PlaceHolderImages[8].imageUrl, phone: '(217) 555-0114', email: 'ben.carter@meditrack.com', address: '1902 Thornridge Cir. Shiloh, Hawaii 81063' },
];

export type Nurse = {
  id: string;
  name: string;
  department: string;
  status: 'Active' | 'On-leave';
  avatarUrl: string;
};

export const nurses: Nurse[] = [
    { id: 'NRS001', name: 'Aisha Khan', department: 'ICU', status: 'Active', avatarUrl: PlaceHolderImages[7].imageUrl },
    { id: 'NRS002', name: 'David Lee', department: 'Emergency', status: 'On-leave', avatarUrl: PlaceHolderImages[9].imageUrl },
];
