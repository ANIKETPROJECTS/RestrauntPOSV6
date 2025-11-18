import AppHeader from "../AppHeader";

export default function AppHeaderExample() {
  return (
    <div>
      <AppHeader
        title="Restaurant POS"
        showSearch={true}
        onProfileClick={() => console.log("Profile clicked")}
        onSettingsClick={() => console.log("Settings clicked")}
      />
    </div>
  );
}