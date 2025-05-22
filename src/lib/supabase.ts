import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function addLogo(logoData: any, userId: string) {
  try {
    // Insert main logo data
    const { data: logo, error: logoError } = await supabase
      .from('logos')
      .insert({
        user_id: userId,
        name: logoData.name,
        description: logoData.description,
        client_name: logoData.clientName,
        category_name: logoData.categoryName,
        status: logoData.status,
        designer: logoData.designer,
        studio: logoData.studio,
        licences: logoData.licencesDetails,
        image_url: logoData.imageUrl
      })
      .select()
      .single();

    if (logoError) throw logoError;

    // Insert colors
    if (logoData.colors.length > 0) {
      const { error: colorsError } = await supabase
        .from('logo_colors')
        .insert(
          logoData.colors.map((color: any) => ({
            logo_id: logo.id,
            name: color.name,
            hex_code: color.hex_code
          }))
        );

      if (colorsError) throw colorsError;
    }

    // Insert fonts
    if (logoData.fonts.length > 0) {
      const { error: fontsError } = await supabase
        .from('logo_fonts')
        .insert(
          logoData.fonts.map((font: any) => ({
            logo_id: logo.id,
            name: font.name
          }))
        );

      if (fontsError) throw fontsError;
    }

    // Insert external links
    if (logoData.externalLinks && logoData.externalLinks.length > 0) {
      const { error: linksError } = await supabase
        .from('logo_external_links')
        .insert(
          logoData.externalLinks.map((link: any) => ({
            logo_id: logo.id,
            name: link.name,
            url: link.url
          }))
        );

      if (linksError) throw linksError;
    }

    return { logo, error: null };
  } catch (error) {
    console.error('Error adding logo:', error);
    return { logo: null, error };
  }
}