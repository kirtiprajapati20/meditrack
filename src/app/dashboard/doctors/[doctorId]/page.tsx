import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { doctors, patients as allPatients, appointments } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Star, TrendingUp, MoreHorizontal, CalendarPlus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function DoctorDetailPage({ params }: { params: { doctorId: string } }) {
  const doctor = doctors.find(d => d.id === params.doctorId);

  if (!doctor) {
    notFound();
  }
  
  // Find patients associated with the doctor through appointments
  const doctorAppointments = appointments.filter(a => a.doctorName === doctor.name);
  const patientNames = [...new Set(doctorAppointments.map(a => a.patientName))];
  const doctorPatients = allPatients.filter(p => patientNames.includes(p.name)).map(p => {
    const appointment = doctorAppointments.find(a => a.patientName === p.name);
    return {
        ...p,
        condition: appointment?.condition || 'N/A',
        treatmentPlan: appointment?.treatmentPlan || 'N/A',
        appointmentStatus: appointment?.status || 'Completed',
        appointmentDate: appointment ? new Date(appointment.date).toLocaleDateString() : 'N/A',
        appointmentTime: appointment?.time || 'N/A',

    }
  });


  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800'; // This could be mapped to a theme color if needed
      case 'Completed':
        return 'bg-green-100 text-green-800'; // This could be mapped to secondary
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800'; // This could be mapped to a theme color if needed
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="space-y-8">
      {/* Doctor Header */}
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-32 h-32 border-4 border-white shadow-md">
            <AvatarImage src={doctor.avatarUrl} />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div>
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">{doctor.name}</h1>
                    <Badge variant="secondary">Active</Badge>
                    <Badge variant="destructive">Full Time</Badge>
                </div>
                <p className="text-muted-foreground">{doctor.speciality}</p>
              </div>
               <div className="flex gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                <Button variant="outline" size="sm"><Mail className="mr-2 h-4 w-4" /> Chat</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{doctor.address}</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="interactive-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2"><GraduationCap className="w-4 h-4"/> Education Quality</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">3.89 GPA</p>
                <p className="text-xs text-muted-foreground">MBBS, California University</p>
                <Progress value={82} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-primary"/> 3.82 (AVG Semester)</p>
            </CardContent>
        </Card>
        <Card className="interactive-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2"><Briefcase className="w-4 h-4"/> Experience History</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">12+ Years</p>
                <p className="text-xs text-muted-foreground">Treatments in {doctor.speciality}</p>
                <Progress value={55} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-yellow-500"/> 55.8% (Performance)</p>
            </CardContent>
        </Card>
        <Card className="interactive-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2"><Star className="w-4 h-4"/> Rating Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">4.8 / 5.0</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
                <Progress value={96} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-primary"/> 96% (Patient Satisfaction)</p>
            </CardContent>
        </Card>
      </div>
      

      {/* Patient Treatment List */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>Patient Treatment</CardTitle>
                <p className="text-sm text-muted-foreground">Comprehensive care tailored to each patient's condition and recovery.</p>
            </div>
            <Button variant="outline"><CalendarPlus className="mr-2 h-4 w-4"/> Schedule Appointment</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date | Time</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Treatment Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorPatients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>{patient.appointmentDate}</div>
                    <div className="text-xs text-muted-foreground">{patient.appointmentTime}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={patient.avatarUrl} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.treatmentPlan}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(getStatusVariant(patient.appointmentStatus))}>{patient.appointmentStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
