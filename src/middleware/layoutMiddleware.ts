export async function loadLayoutMiddleware(route: any) {
  const layout = route.meta.layout || 'DefaultLayout'; // Default layout fallback
  route.meta.layoutComponent = await loadLayoutComponent(layout);
}

/**
 * Dynamically loads the layout component based on the layout name.
 * Falls back to 'AppLayoutDefault' if the layout is not found or an error occurs.
 * @param layoutName The name of the layout to load
 * @returns A Promise that resolves to the layout component
 */
async function loadLayoutComponent(layoutName: string) {
  try {
    const layoutComponent = await import(`@/layouts/${layoutName}.vue`);
    return layoutComponent.default;
  } catch (error) {
    console.error(`Error loading ${layoutName} layout: `, error);
    return await loadFallbackLayout();
  }
}

/**
 * Loads the default fallback layout ('AppLayoutDefault') when the requested layout fails to load.
 * @returns A Promise that resolves to the default layout component
 */
async function loadFallbackLayout() {
  const defaultLayout = 'DefaultLayout';
  try {
    const layoutComponent = await import(`@/layouts/${defaultLayout}.vue`);
    console.log(`${defaultLayout} loaded as fallback.`);
    return layoutComponent.default;
  } catch (error) {
    console.error(`Critical error: Unable to load fallback layout: `, error);
    throw new Error('Failed to load any layout, including fallback.');
  }
}
