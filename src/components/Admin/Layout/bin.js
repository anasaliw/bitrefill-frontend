//Permissions
<ListItem
  sx={{
    pt: 0,
    "& :hover": {
      background: "transparent",
    },
  }}
>
  <ListItemButton
    sx={{
      pt: "0px",
      pb: "0px",
      "&:hover": {},
    }}
  >
    <Box sx={{ display: "flex" }}>
      <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
        <Setting style={{ color: "white" }} />
      </ListItemIcon>
      <Accordion
        disableGutters
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{
            padding: "0px 0px",
            marginRight: "-12px",
            "& .MuiAccordion-root	": {
              "& .Mui-expanded ": {
                margin: "0px",
              },
              "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                margin: "0px",
              },
            },
          }}
        >
          <StyledText>Manage Permissions</StyledText>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {handlePermissionCheck("createRole") ? (
            <ListItemButton
              onClick={() => navigate("/addPermissions")}
              sx={{
                pt: "5px",
                pb: "5px",
              }}
            >
              <StyledText>Add Role and Permissions</StyledText>
            </ListItemButton>
          ) : (
            ""
          )}
          {/* "getAllRoles" */}

          {handlePermissionCheck("getAllRoles") ? (
            <ListItemButton
              // component={Link}
              onClick={() => navigate("/allRoles")}
              sx={{
                pt: "5px",
                pb: "5px",
              }}
            >
              <StyledText>All Roles</StyledText>
            </ListItemButton>
          ) : (
            ""
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  </ListItemButton>
</ListItem>;

//
<ListItem
  sx={{
    pt: 0,
    "& :hover": {
      background: "transparent",
    },
  }}
>
  <ListItemButton
    sx={{
      pt: "0px",
      pb: "0px",
      "&:hover": {
        // backgroundColor: "white",
      },
    }}
  >
    <Box sx={{ display: "flex" }}>
      <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
        <Setting style={{ color: "white" }} />
      </ListItemIcon>
      <Accordion
        disableGutters
        // paperProps={{ sx: { backgroundColor: "red" } }}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{
            padding: "0px 0px",
            marginRight: "-39px",
            // "& .MuiAccordionSummary-root": {
            //   padding: 0,
            // },
            "& .MuiAccordion-root	": {
              "& .Mui-expanded ": {
                margin: "0px",
              },
              "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                margin: "0px",
              },
            },
          }}
        >
          <StyledText>Manage Category</StyledText>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {/* <ListItem> */}
          {handlePermissionCheck("createCategory") ? (
            <ListItemButton
              // component={Link}
              onClick={() => navigate("/addCategory")}
              sx={{
                pt: "5px",
                pb: "5px",
              }}
            >
              <StyledText>Add Category</StyledText>
            </ListItemButton>
          ) : (
            ""
          )}

          {handlePermissionCheck("getAllCategories") ? (
            <ListItemButton
              // component={Link}
              onClick={() => navigate("/allCategories")}
              sx={{
                pt: "5px",
                pb: "5px",
              }}
            >
              <StyledText>All Categories</StyledText>
            </ListItemButton>
          ) : (
            ""
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  </ListItemButton>
</ListItem>;

{
  handlePermissionCheck("getAllOrders") ? (
    <>
      <ListItem sx={{ pb: 1.5, pt: 1.5 }}>
        <ListItemButton
          onClick={() => navigate("/adminOrderDetails")}
          sx={{
            pt: "0px",
            pb: "0px",
          }}
        >
          <ListItemIcon sx={{ minWidth: "45px" }}>
            <Home2 />
          </ListItemIcon>
          <StyledText>Order Details</StyledText>
        </ListItemButton>
      </ListItem>
    </>
  ) : (
    ""
  );
}

{
  handlePermissionCheck("getallusers") ? (
    <ListItem sx={{ pb: 1.5, pt: 1.5 }}>
      <ListItemButton
        onClick={() => navigate("/transactions")}
        sx={{
          pt: "0px",
          pb: "0px",
        }}
      >
        <ListItemIcon sx={{ minWidth: "45px" }}>
          <Home2 />
        </ListItemIcon>
        <StyledText>Transactions</StyledText>
      </ListItemButton>
    </ListItem>
  ) : (
    ""
  );
}

{
  handlePermissionCheck("getallusers") ? (
    <ListItem
      sx={{
        pt: 0,
        "& :hover": {
          background: "transparent",
        },
      }}
    >
      <ListItemButton
        sx={{
          pt: "0px",
          pb: "0px",
          "&:hover": {
            // backgroundColor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <ListItemIcon sx={{ minWidth: "45px", paddingTop: "12px" }}>
            <Home2 style={{ color: "white" }} />
          </ListItemIcon>
          <Accordion
            disableGutters
            // paperProps={{ sx: { backgroundColor: "red" } }}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              width: "100%",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              sx={{
                padding: "0px 0px",
                marginRight: "-70px",
                // "& .MuiAccordionSummary-root": {
                //   padding: 0,
                // },
                "& .MuiAccordion-root	": {
                  "& .Mui-expanded ": {
                    margin: "0px",
                  },
                  "&.MuiPaper-root-MuiAccordion-root.Mui-expanded": {
                    margin: "0px",
                  },
                },
              }}
            >
              <StyledText>Manage Users</StyledText>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {/* <ListItem> */}
              <ListItemButton
                // component={Link}
                onClick={() => navigate("/allUsers")}
                sx={{
                  pt: "5px",
                  pb: "5px",
                }}
              >
                <StyledText>All Users</StyledText>
              </ListItemButton>
              {/* <ListItemButton
            // component={Link}
            onClick={() => navigate("/approveUsers")}
            sx={{
              pt: "5px",
              pb: "5px",
            }}
          >
            <StyledText>Approve Users</StyledText>
          </ListItemButton> */}
            </AccordionDetails>
          </Accordion>
        </Box>
      </ListItemButton>
    </ListItem>
  ) : (
    ""
  );
}
