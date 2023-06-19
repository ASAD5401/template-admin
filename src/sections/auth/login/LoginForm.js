import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "mdi-material-ui/Eye";
import VisibilityOff from "mdi-material-ui/EyeOff";
import { useAuth } from 'src/hooks/useAuth';
// ----------------------------------------------------------------------
const defaultValues = {
  password: "asad",
  cnic: "4220143032141"
};
export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {login}=useAuth()

  const schema = yup.object().shape({
    cnic: yup.string().min(13).max(13).required("This field is required"),
    password: yup.string().required("This field is required")
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });
const onLogin=async (data)=>{
  if(data){
   await login(data)
  }
}
  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <form >
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="cnic"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={"CNIC"}
                  type="cnic"
                  onChange={onChange}
                  error={Boolean(errors.cnic)}
                />
              )}
            />
            {errors.cnic && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.cnic.message}
              </FormHelperText>
            )}
          </FormControl>

          <Box>
            <FormControl fullWidth>
              <InputLabel error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    onBlur={onBlur}
                    value={value}
                    label={"Password"}
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <LoadingButton style={{marginTop:20}} fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit(onLogin)}>
            Login
          </LoadingButton>
        </form>
      </Stack>

    </>
  );
}
