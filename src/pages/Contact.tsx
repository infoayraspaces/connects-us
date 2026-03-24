import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .regex(/^(\+?57)?[3][0-9]{9}$/, "Ingresa un número colombiano válido (ej: 3001234567)")
    .or(z.literal(""))
    .optional(),
  location: z.string().optional(),
  message: z
    .string()
    .max(500, "El mensaje no puede superar 500 caracteres")
    .optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", location: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("https://formspree.io/f/xzdadkpy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("¡Mensaje enviado! Te contactaremos pronto.");
        reset();
      } else {
        toast.error("Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.");
      }
    } catch {
      toast.error("Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.");
    }
  };

  return (
    <Layout>
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
              Contacto
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Agenda tu tour
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Déjanos tus datos y te contactaremos para coordinar una visita a la sede que más te interese.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Tu nombre"
                      className="bg-background"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="tu@email.com"
                      className="bg-background"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono / WhatsApp
                    </label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="3001234567"
                      className="bg-background"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                      ¿Qué sede te interesa?
                    </label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Selecciona una sede" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modelia">La Nevera Living - Modelia</SelectItem>
                            <SelectItem value="teusaquillo">Eco Living - Teusaquillo</SelectItem>
                            <SelectItem value="ferias">Eco Living Terraza - Ferias</SelectItem>
                            <SelectItem value="todas">Todas me interesan</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje (opcional)
                  </label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Cuéntanos qué buscas, cuándo te gustaría mudarte, o cualquier pregunta..."
                    rows={4}
                    className="bg-background"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-warm rounded-xl p-8 space-y-8">
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-4">Otras formas de contacto</h3>
                  <p className="text-muted-foreground text-sm">
                    Si prefieres contactarnos directamente, estamos disponibles por los siguientes canales.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="https://wa.me/573028366373"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+57 302 836 6373</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">info@ayracoliving.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Ubicación</p>
                      <p className="text-sm text-muted-foreground">Bogotá, Colombia</p>
                      <p className="text-sm text-muted-foreground">3 sedes: Modelia, Teusaquillo, Ferias</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Respondemos en menos de 24 horas. Los tours son de lunes a sábado, de 9am a 6pm.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
