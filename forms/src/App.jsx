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
import { styled } from "@mui/system";

const KOLWithMayaForm = () => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      projectName: "",
      ticker: "",
      twitterHandle: "",
      website: "",
      mayaFocus: "",
      alphaNews: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    // Prepare the message
    const message = `
      <b>KOL with MAYA Submission</b>
      <b>Project Name:</b> ${data.projectName}
      <b>Ticker:</b> ${data.ticker}
      <b>Twitter Handle:</b> ${data.twitterHandle}
      <b>Website:</b> ${data.website}
      <b>Maya Focus:</b> ${data.mayaFocus}
      <b>Alpha News:</b> ${data.alphaNews || "N/A"}
    `;

    try {
      // Submit to Telegram
      const token = "7203146478:AAGD-NN4k9qZTGcJj5M_JmpdIBbU6JqpYfM";
      const chatId = "@maya_forms";
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to Telegram");
      }

      console.log("Message sent to Telegram!");
      setOpen(true); // Show success dialog
      reset(); // Reset the form
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
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
        fontFamily: "'Cinzel Decorative', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Form Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#ff3b3b",
          fontWeight: "bold",
          marginBottom: "24px",
          fontFamily: "'Cinzel Decorative', serif",
        }}
      >
        KOL with MAYA
      </Typography>

      {/* Form */}
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
          {/* Name of Project */}
          <Controller
            name="projectName"
            control={control}
            rules={{ required: "Project name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name of project"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.projectName}
                helperText={formState.errors.projectName?.message}
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
                label="Ticker (must start with $)"
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
            name="twitterHandle"
            control={control}
            rules={{
              required: "Twitter handle is required",
              validate: (value) =>
                value.startsWith("@") || "Twitter handle must start with @",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Twitter handle"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2b2b2b", color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#aaaaaa" },
                }}
                error={!!formState.errors.twitterHandle}
                helperText={formState.errors.twitterHandle?.message}
              />
            )}
          />

          {/* Website */}
          <Controller
            name="website"
            control={control}
            rules={{
              required: "Website is required",
              pattern: {
                value: /^(https?:\/\/)([\w\d-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/,
                message: "Must be a valid URL starting with http or https",
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

          {/* Maya Focus */}
          <Controller
            name="mayaFocus"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What should Maya's focus be?"
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
                error={!!formState.errors.mayaFocus}
                helperText={formState.errors.mayaFocus?.message}
              />
            )}
          />

          {/* Alpha News */}
          <Controller
            name="alphaNews"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Any alpha or news to share?"
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
      >
        <DialogContent
          sx={{
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderRadius: "8px",
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
            sx={{ marginBottom: "16px", color: "#ff3b3b", fontWeight: "bold" }}
          >
            Thank you for your submission!
          </Typography>
          <Typography>
            We’ve received your details and will review them soon.
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
              "&:hover": { backgroundColor: "#e02e2e" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* White Paper Button */}
      <Button
        href="https://docs.google.com/document/d/e/2PACX-1vRCg9hBMKRcMqUFuDnNvjko9z0m47NGib6UaMpbkPcob9YY9cWNlp7j-wn5PU-5zZGU05O_LqnioGRn/pub"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        White Paper
      </Button>
    </Box>
  );
};

export default KOLWithMayaForm;
