import { useAuth, SignInButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function LandingPage() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ArrowPathIcon className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const features = [
    {
      icon: DocumentTextIcon,
      title: "Data Collection",
      description: "Submit and manage data with our intuitive form system",
      color: "text-blue-500"
    },
    {
      icon: ChartBarIcon,
      title: "Smart Analytics",
      description: "View insights through interactive dashboards",
      color: "text-green-500"
    },
    {
      icon: UserGroupIcon,
      title: "Community Engagement",
      description: "Connect and collaborate with community members",
      color: "text-purple-500"
    }
  ];

  const benefits = [
    {
      icon: LightBulbIcon,
      title: "Data-Driven Decisions",
      description: "Make informed choices based on real community data"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Private",
      description: "Enterprise-grade security for your sensitive data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Public Engagement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Portal
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering communities through data-driven insights and collaborative engagement
          </p>
          <div className="mt-10">
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-8 py-3 text-lg border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </button>
            </SignInButton>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8">
                <div className={`${feature.color} mb-5`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <benefit.icon className="h-6 w-6 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20 bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">100+</div>
              <div className="mt-2 text-gray-600">Communities Served</div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">50k+</div>
              <div className="mt-2 text-gray-600">Data Points Collected</div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">95%</div>
              <div className="mt-2 text-gray-600">Satisfaction Rate</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Public Engagement Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
