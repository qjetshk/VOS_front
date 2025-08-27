import { useState } from "react";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../store/slices/userSlice";
import { eventApi } from "../store/api/event";
import { participationApi } from "../store/api/participation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (data) => {
    try {
      const { confirmPassword, ...registrationData } = data;
      const response = await api.post("auth/register", registrationData);
      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post("auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        setMessage(response.data.message);
        dispatch(eventApi.util.invalidateTags(["Event"]));
        return true;
      }
    } catch (e) {
      setMessage(e.response.data.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await api.post("auth/logout");
      if (response.status === 200) {
        dispatch(update(null));
        dispatch(eventApi.util.resetApiState());
        dispatch(participationApi.util.resetApiState());
        setMessage("Вы успешно вышли");
        navigate("/auth");
      }
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await api.post("auth/check_auth");
      dispatch(update(response.data.user));
      setIsAuthenticated(response.data.isAuth);
      return response.data.isAuth;
    } catch (error) {
      setIsAuthenticated(false);
      dispatch(update(null));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated,
  };
}
