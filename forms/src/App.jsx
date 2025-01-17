import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "@fontsource/cinzel-decorative"; // Import Cinzel Decorative font
import "@fontsource/holtwood-one-sc";
import emailjs from "emailjs-com";

const imageUrl = "/maya.jpeg";

const KOLWithMayaForm = () => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: "",
      ticker: "",
      CA: "",
      twitter_handle: "",
      website: "",
      focus: "",
      news: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.website.startsWith("https://")) {
      data.website = `https://${data.website}`;
    }

    console.log("Form data:", data);

    const message = `
      <b>Ask Maya To Shill Submission</b>
      <b>Name:</b> ${data.name}
      <b>Ticker:</b> ${data.ticker}
      <b>Contact Address:</b> ${data.CA}
      <b>Twitter Handle:</b> ${data.twitter_handle}
      <b>Website:</b> ${data.website}
      <b>A short project intro:</b> ${data.focus}
      <b>Any latest news or developments:</b> ${data.news}
    `;

    try {
      // Telegram Integration
      const token = "7203146478:AAGD-NN4k9qZTGcJj5M_JmpdIBbU6JqpYfM";
      const chatId = "@maya_forms";
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

      const telegramResponse = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (!telegramResponse.ok) {
        throw new Error("Failed to send message to Telegram");
      }

      console.log("Message sent to Telegram!");

      // EmailJS Integration
      const emailParams = {
        name: data.name,
        ticker: data.ticker,
        CA: data.CA,
        twitter_handle: data.twitter_handle,
        website: data.website,
        focus: data.focus,
        news: data.news,
      };

      await emailjs.send(
        "service_8ju8id3", // Replace with your EmailJS service ID
        "template_sfty2ik", // Replace with your EmailJS template ID
        emailParams,
        "uvVg_NEbCQo0v4cEL" // Replace with your EmailJS public key/user ID
      );

      console.log("Message sent via EmailJS!");

      // API Integration
      const apiUrl =
        "https://dolphin-app-tbrkb.ondigitalocean.app/api/maya-forms/";

      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to send data to the API endpoint");
      }

      console.log("Data sent to the API endpoint!");

      setOpen(true);
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "'Holtwood One SC', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circular Image */}
      <Box
        component="img"
        src={imageUrl}
        alt="Maya"
        sx={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "16px",
          border: "4px solid #ff3b3b",
        }}
      />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#ff3b3b",
          fontWeight: "bold",
          marginBottom: "24px",
          fontFamily: "'Holtwood One SC', serif",
        }}
      >
        Ask Maya To Shill
      </Typography>

      <Grow in>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
              />
            )}
          />

          {/* Ticker */}
          <Controller
            name="ticker"
            control={control}
            rules={{
              required: "Ticker is required",
              validate: (value) =>
                value.startsWith("$") || "Ticker must start with $",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ticker (must start with $) *"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.ticker}
                helperText={formState.errors.ticker?.message}
              />
            )}
          />

          {/* Twitter Handle */}
          <Controller
            name="twitter_handle"
            control={control}
            rules={{
              required: "Twitter handle is required",
              validate: (value) =>
                value.startsWith("@") || "Twitter handle must start with @",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Twitter handle *"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.twitter_handle}
                helperText={formState.errors.twitter_handle?.message}
              />
            )}
          />

          {/* CA */}
          <Controller
            name="CA"
            control={control}
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Contract Address must be alphanumeric",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contract Address (Alphanumeric) "
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.CA}
                helperText={formState.errors.CA?.message}
              />
            )}
          />

          {/* Website */}
          <Controller
            name="website"
            control={control}
            rules={{
              validate: (value) => {
                if (value.startsWith("http:")) {
                  return "Only https is allowed";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.website}
                helperText={formState.errors.website?.message}
              />
            )}
          />

          {/* Focus */}
          <Controller
            name="focus"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="A short project intro"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
              />
            )}
          />

          {/* News */}
          <Controller
            name="news"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Any latest news or developments"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#ff3b3b",
              color: "#fff",
              marginTop: "16px",
              "&:hover": { backgroundColor: "#e02e2e" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Grow>
      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        PaperProps={{
          style: {
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: "#1e1e1e",
            padding: "24px",
            position: "relative",
            fontFamily: "'Cinzel Decorative', serif",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "16px",
              color: "#ff3b3b",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Thank you for the submission
          </Typography>
          <Typography
            sx={{
              color: "#ccc",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Maya will now review your project and take a call
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#1e1e1e",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#ff3b3b",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e02e2e" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KOLWithMayaForm;
