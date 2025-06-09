
import React from "react";
import TravelConnectSignin from "@/components/ui/travel-connect-signin-1";
import Header from "@/components/shared/Header";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spot-beige/20 to-spot-secondary/10">
      <Header theme="light" />
      <div className="pt-20">
        <TravelConnectSignin />
      </div>
    </div>
  );
};

export default LoginPage;
