import React from "react";
import { Outlet, useNavigation } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner";
export default function () {
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "loading" || navigation.state === "submitting";
  return <>{isLoading ? <LoadingSpinner /> : <Outlet />}</>;
}
