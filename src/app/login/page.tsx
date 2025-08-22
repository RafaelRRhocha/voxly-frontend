"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";
import { authService } from "@/services";

export default function LoginPage() {
  const [isResetMode, setIsResetMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { loginAndRedirect } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email é obrigatório";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Formato de email inválido";
    }

    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) {
      return "Senha é obrigatória";
    }

    if (password.length < 8) {
      return "Senha deve ter pelo menos 8 caracteres";
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return "Senha deve conter pelo menos uma letra minúscula";
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return "Senha deve conter pelo menos uma letra maiúscula";
    }

    if (!/(?=.*\d)/.test(password)) {
      return "Senha deve conter pelo menos um número";
    }

    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      return "Senha deve conter pelo menos um caractere especial";
    }

    return "";
  };

  const validateNewPassword = (password: string): string => {
    if (!password.trim()) {
      return "Nova senha é obrigatória";
    }

    if (password.length < 8) {
      return "Nova senha deve ter pelo menos 8 caracteres";
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return "Nova senha deve conter pelo menos uma letra minúscula";
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return "Nova senha deve conter pelo menos uma letra maiúscula";
    }

    if (!/(?=.*\d)/.test(password)) {
      return "Nova senha deve conter pelo menos um número";
    }

    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      return "Nova senha deve conter pelo menos um caractere especial";
    }

    return "";
  };

  const validateConfirmPassword = (confirmPassword: string): string => {
    if (!confirmPassword.trim()) {
      return "Confirmação de senha é obrigatória";
    }

    if (confirmPassword !== newPassword) {
      return "As senhas não coincidem";
    }

    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordError(validateNewPassword(value));
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isResetMode) {
      const emailValidation = validateEmail(email);
      const newPasswordValidation = validateNewPassword(newPassword);
      const confirmPasswordValidation =
        validateConfirmPassword(confirmPassword);

      setEmailError(emailValidation);
      setNewPasswordError(newPasswordValidation);
      setConfirmPasswordError(confirmPasswordValidation);

      if (
        emailValidation ||
        newPasswordValidation ||
        confirmPasswordValidation
      ) {
        return;
      }

      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
        await authService.resetPassword(email, newPassword);
        setSuccess("Senha alterada com sucesso!");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setIsResetMode(false);
      } catch (error) {
        console.error(error);
        setError("Erro ao alterar senha. Verifique se o email está correto.");
      } finally {
        setIsLoading(false);
      }
    } else {
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);

      setEmailError(emailValidation);
      setPasswordError(passwordValidation);

      if (emailValidation || passwordValidation) {
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        await loginAndRedirect(email, password, "/dashboard");
      } catch (error) {
        console.error(error);
        setError("Email ou senha inválidos");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 size-full min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isResetMode ? "Reset de Senha" : "Acesse sua conta"}
          </CardTitle>
          <CardDescription>
            {isResetMode
              ? "Digite seu email e uma nova senha para redefinir sua conta"
              : "Entre com seu email e senha para acessar o dashboard"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 ${emailError ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {emailError && (
                <div className="text-red-600 text-sm">{emailError}</div>
              )}
            </div>

            {!isResetMode && (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`pl-10 ${passwordError ? "border-red-500" : ""}`}
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordError && (
                  <div className="text-red-600 text-sm">{passwordError}</div>
                )}
              </div>
            )}

            {isResetMode && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Sua nova senha"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className={`pl-10 ${newPasswordError ? "border-red-500" : ""}`}
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {newPasswordError && (
                    <div className="text-red-600 text-sm">
                      {newPasswordError}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua nova senha"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`pl-10 ${confirmPasswordError ? "border-red-500" : ""}`}
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {confirmPasswordError && (
                    <div className="text-red-600 text-sm">
                      {confirmPasswordError}
                    </div>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            {success && (
              <div className="text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !!emailError ||
                (isResetMode
                  ? !!newPasswordError || !!confirmPasswordError
                  : !!passwordError)
              }
            >
              {isLoading
                ? isResetMode
                  ? "Alterando..."
                  : "Entrando..."
                : isResetMode
                  ? "Alterar Senha"
                  : "Entrar"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(!isResetMode);
                  setError("");
                  setSuccess("");
                  setEmail("");
                  setPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setEmailError("");
                  setPasswordError("");
                  setNewPasswordError("");
                  setConfirmPasswordError("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {isResetMode ? "Voltar ao login" : "Esqueci minha senha"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
