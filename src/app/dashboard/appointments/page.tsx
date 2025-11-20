import PageHeader from '@/components/dashboard/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { appointments, patients } from '@/lib/placeholder-data';
import { BookAppointmentDialog } from '@/components/dashboard/book-appointment-dialog';

export default function AppointmentsPage() {
  return (
    <>
      <PageHeader title="Appointments">
        <BookAppointmentDialog />
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appointment) => {
                const patient = patients.find(p => p.name === appointment.patientName);
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      {patient && (
                        <Avatar>
                          <AvatarImage src={patient.avatarUrl} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="font-semibold">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
