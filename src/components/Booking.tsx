import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Car, Calendar, User, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type PackageTier = 'Standard' | 'Premium+' | 'Ultimate++';
type VehicleSize = 'Coupe' | 'Sedan' | 'SUV / Truck' | 'Large SUV / Truck';

type Vehicle = {
  packageTier: PackageTier;
  vehicleSize: VehicleSize;
};

const packageOptions: PackageTier[] = ['Standard', 'Premium+', 'Ultimate++'];
const sizeOptions: VehicleSize[] = ['Coupe', 'Sedan', 'SUV / Truck', 'Large SUV / Truck'];
const timeOptions = ['Morning (8am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)'];

export default function Booking() {
  const { ref, isVisible } = useScrollReveal();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [numVehicles, setNumVehicles] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { packageTier: 'Standard', vehicleSize: 'Sedan' },
  ]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = [...vehicles];
    updated[index] = { ...updated[index], [field]: value };
    setVehicles(updated);
  };

  const handleNumVehiclesChange = (num: number) => {
    setNumVehicles(num);
    const updated = [...vehicles];
    while (updated.length < num) {
      updated.push({ packageTier: 'Standard', vehicleSize: 'Sedan' });
    }
    updated.length = num;
    setVehicles(updated);
  };

  const canContinueStep1 = vehicles.length > 0;
  const canContinueStep2 = date && time && address;
  const canSubmit = name.trim() && phone.trim();

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const { error: insertError } = await supabase.from('booking_requests').insert({
        name: name.trim(),
        phone: phone.trim(),
        preferred_date: date,
        preferred_time: time,
        address: address.trim(),
        num_vehicles: numVehicles,
        vehicles: vehicles,
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-800/30 rounded-full blur-3xl" />

      <div ref={ref} className={`relative mx-auto max-w-3xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-ultra text-navy-300 mb-4">
            Book Your Detail
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
            Schedule in 3 Easy Steps
          </h2>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-white p-10 text-center animate-fade-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 mb-6">
              <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">
              Request Received!
            </h3>
            <p className="text-navy-500 max-w-md mx-auto">
              We&apos;ll be in touch within 24 hours to confirm your appointment. For urgent
              inquiries, call or text us directly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setName('');
                setPhone('');
                setDate('');
                setTime('');
                setAddress('');
                setNumVehicles(1);
                setVehicles([{ packageTier: 'Standard', vehicleSize: 'Sedan' }]);
              }}
              className="mt-8 inline-flex items-center rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Book Another
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 md:p-10 shadow-2xl">
            {/* Progress indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                        step >= s
                          ? 'bg-navy-900 text-white'
                          : 'bg-navy-100 text-navy-400'
                      }`}
                    >
                      {step > s ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div className="flex-1 mx-2 md:mx-4 h-0.5 rounded-full overflow-hidden bg-navy-100">
                        <div
                          className={`h-full bg-navy-900 transition-all duration-500 ${
                            step > s ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs font-medium">
                <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-navy-900' : 'text-navy-300'}`}>
                  <Car className="h-3.5 w-3.5" /> Vehicles
                </span>
                <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-navy-900' : 'text-navy-300'} hidden md:flex`}>
                  <Calendar className="h-3.5 w-3.5" /> Schedule
                </span>
                <span className={`flex items-center gap-1.5 ${step >= 3 ? 'text-navy-900' : 'text-navy-300'}`}>
                  <User className="h-3.5 w-3.5" /> Contact
                </span>
              </div>
            </div>

            {/* Step 1: Vehicles */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-3">
                    How many vehicles?
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleNumVehiclesChange(n)}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold transition-all duration-200 ${
                          numVehicles === n
                            ? 'bg-navy-900 text-white scale-105'
                            : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {vehicles.map((vehicle, i) => (
                  <div key={i} className="rounded-xl border border-navy-100 p-5">
                    <p className="text-sm font-semibold text-navy-900 mb-4">
                      Vehicle {numVehicles > 1 ? `#${i + 1}` : ''}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-navy-500 mb-2 uppercase tracking-wide">
                          Package
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {packageOptions.map((pkg) => (
                            <button
                              key={pkg}
                              onClick={() => updateVehicle(i, 'packageTier', pkg)}
                              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                vehicle.packageTier === pkg
                                  ? 'bg-navy-900 text-white'
                                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                              }`}
                            >
                              {pkg}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-navy-500 mb-2 uppercase tracking-wide">
                          Vehicle Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {sizeOptions.map((size) => (
                            <button
                              key={size}
                              onClick={() => updateVehicle(i, 'vehicleSize', size)}
                              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                vehicle.vehicleSize === size
                                  ? 'bg-navy-900 text-white'
                                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {timeOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-lg px-4 py-3 text-sm font-medium transition-all text-left ${
                          time === t
                            ? 'bg-navy-900 text-white'
                            : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Address or City
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Main St, Laguna Niguel"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-200 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(949) 555-0123"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-200 outline-none transition-all"
                  />
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-navy-50 p-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-2">Booking Summary</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Vehicles</span>
                    <span className="font-medium text-navy-900">{numVehicles}</span>
                  </div>
                  {vehicles.map((v, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-navy-500">Vehicle {i + 1}</span>
                      <span className="font-medium text-navy-900">{v.packageTier} • {v.vehicleSize}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Date</span>
                    <span className="font-medium text-navy-900">{date || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Time</span>
                    <span className="font-medium text-navy-900">{time || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Location</span>
                    <span className="font-medium text-navy-900 text-right max-w-[60%]">{address || '—'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>Submit Request</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
