import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch("https://formspree.io/f/xzdadkpy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      setFormData({ name: "", email: "", phone: "", location: "", message: "" });
    } else {
      toast.error("Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.");
    }
  } catch (error) {
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono / WhatsApp
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+57 300 123 4567"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                      ¿Qué sede te interesa?
                    </label>
                    <Select
                      value={formData.location}
                      onValueChange={(v) => setFormData({ ...formData, location: v })}
                    >
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
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje (opcional)
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos qué buscas, cuándo te gustaría mudarte, o cualquier pregunta..."
                    rows={4}
                    className="bg-background"
                  />
                </div>

                <Button variant="hero" size="xl" type="submit" className="w-full md:w-auto">
                  <Send className="w-5 h-5" />
                  Enviar solicitud
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
