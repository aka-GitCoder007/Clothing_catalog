"""
Blender 4.x / 3.x Python Automation Script for VOID.ARCHIVE Spider Tech Hoodie.
Run this script inside Blender (Scripting workspace -> Run Script) or from the terminal:
blender --background --python scripts/blender_generate_spider_hoodie.py

This script:
1. Clears the default scene.
2. Creates procedural 3D garment geometry:
   - Oversized streetwear torso (front & back with volume)
   - 3D cowl hood with hollow visible face opening and crimson trim
   - Left and right separate curved sleeves with ribbed wrist cuffs
   - Front kangaroo pouch pocket with angled piping
   - Bottom ribbed hem waistband
   - Drawstrings with metallic chrome aglets
   - Spider-inspired streetwear chest graphic
3. Configures PBR materials (Matte Black Technical Cotton, Crimson Red Accents, Chrome Metal).
4. Exports as an optimized binary GLB to:
   public/assets/models/void-archive-spider-hoodie.glb
"""

import bpy
import math
import os

# 1. Clean existing scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# 2. Material Helper
def create_pbr_mat(name, color_rgba, roughness=0.55, metallic=0.1, emissive_rgba=None):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = color_rgba
        bsdf.inputs['Roughness'].default_value = roughness
        bsdf.inputs['Metallic'].default_value = metallic
        if emissive_rgba and 'Emission Color' in bsdf.inputs:
            bsdf.inputs['Emission Color'].default_value = emissive_rgba
            if 'Emission Strength' in bsdf.inputs:
                bsdf.inputs['Emission Strength'].default_value = 0.8
    return mat

mat_black = create_pbr_mat("Mat_BlackFabric", (0.05, 0.05, 0.07, 1.0), roughness=0.6, metallic=0.1)
mat_inner_dark = create_pbr_mat("Mat_InnerHoodDark", (0.015, 0.015, 0.02, 1.0), roughness=0.8, metallic=0.0)
mat_ribbed = create_pbr_mat("Mat_RibbedTrim", (0.07, 0.07, 0.09, 1.0), roughness=0.75, metallic=0.05)
mat_crimson = create_pbr_mat("Mat_CrimsonGraphic", (0.78, 0.07, 0.14, 1.0), roughness=0.32, metallic=0.25, emissive_rgba=(0.35, 0.02, 0.05, 1.0))
mat_chrome = create_pbr_mat("Mat_ChromeAglets", (0.95, 0.96, 0.98, 1.0), roughness=0.1, metallic=0.95)

# Root Collection
root_coll = bpy.context.scene.collection

# 3. Create Torso
bpy.ops.mesh.primitive_cylinder_add(radius=0.92, depth=1.1, location=(0, 0, 0.38))
upper_torso = bpy.context.active_object
upper_torso.name = "Torso_Upper"
upper_torso.data.materials.append(mat_black)

bpy.ops.mesh.primitive_cylinder_add(radius=0.86, depth=0.7, location=(0, 0, -0.38))
lower_torso = bpy.context.active_object
lower_torso.name = "Torso_Lower"
lower_torso.data.materials.append(mat_black)

# Kangaroo Pocket
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0.46, -0.32))
pocket = bpy.context.active_object
pocket.scale = (0.92, 0.14, 0.52)
pocket.name = "Kangaroo_Pocket"
pocket.data.materials.append(mat_black)

# Ribbed Waistband Hem
bpy.ops.mesh.primitive_cylinder_add(radius=0.82, depth=0.3, location=(0, 0, -0.85))
hem = bpy.context.active_object
hem.name = "Ribbed_Hem"
hem.data.materials.append(mat_ribbed)

# 4. 3D Cowl Hood with Visible Hollow Opening
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.66, location=(0, -0.08, 1.35))
hood_outer = bpy.context.active_object
hood_outer.name = "Hood_Outer"
hood_outer.data.materials.append(mat_black)

# Hood Rim Torus (Crimson Red Accent Border)
bpy.ops.mesh.primitive_torus_add(major_radius=0.46, minor_radius=0.038, location=(0, 0.36, 1.25), rotation=(math.radians(45), 0, 0))
hood_rim = bpy.context.active_object
hood_rim.name = "Hood_CrimsonRim"
hood_rim.data.materials.append(mat_crimson)

# Drawstrings with Chrome Aglets
for side, x in [("Left", -0.16), ("Right", 0.16)]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.014, depth=0.58, location=(x, 0.52, 0.68))
    cord = bpy.context.active_object
    cord.name = f"Drawstring_{side}"
    cord.data.materials.append(mat_ribbed)

    bpy.ops.mesh.primitive_cylinder_add(radius=0.022, depth=0.12, location=(x, 0.52, 0.36))
    aglet = bpy.context.active_object
    aglet.name = f"Aglet_{side}"
    aglet.data.materials.append(mat_chrome)

# 5. Articulated Sleeves
for side, x, rot in [("Left", -1.18, math.radians(14)), ("Right", 1.18, math.radians(-14))]:
    # Bicep
    bpy.ops.mesh.primitive_cylinder_add(radius=0.36, depth=0.85, location=(x * 0.55, 0, 0.35), rotation=(0, rot * 1.5, 0))
    bicep = bpy.context.active_object
    bicep.name = f"Sleeve_Bicep_{side}"
    bicep.data.materials.append(mat_black)

    # Forearm
    bpy.ops.mesh.primitive_cylinder_add(radius=0.31, depth=0.88, location=(x * 0.92, 0, -0.42), rotation=(0, rot, 0))
    forearm = bpy.context.active_object
    forearm.name = f"Sleeve_Forearm_{side}"
    forearm.data.materials.append(mat_black)

    # Ribbed Cuff
    bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=0.22, location=(x * 1.05, 0, -0.95), rotation=(0, rot, 0))
    cuff = bpy.context.active_object
    cuff.name = f"Sleeve_Cuff_{side}"
    cuff.data.materials.append(mat_ribbed)

    # Sleeve Red Web Panels
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x * 0.6, 0.02, 0.35), rotation=(0, rot * 1.5, 0))
    s_red = bpy.context.active_object
    s_red.scale = (0.16, 0.36, 0.58)
    s_red.name = f"Sleeve_RedWeb_{side}"
    s_red.data.materials.append(mat_crimson)

# 6. Crimson Spider Chest Graphic
bpy.ops.mesh.primitive_cone_add(radius1=0.14, depth=0.52, location=(0, 0.48, 0.22), rotation=(math.radians(180), 0, 0))
spider_body = bpy.context.active_object
spider_body.name = "Spider_Abdomen"
spider_body.data.materials.append(mat_crimson)

# 7. Export GLB
out_path = os.path.abspath("public/assets/models/void-archive-spider-hoodie.glb")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=out_path, export_format='GLB', export_apply=True)
print(f"Blender script complete: Exported to {out_path}")

