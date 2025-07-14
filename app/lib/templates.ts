// Skinny Studio Image Prompt Generator - Professional Templates Collection

export const professionalTemplates = {
    // Original artistic templates
    artistic: {
        character: {
            name: "Character Consistency",
            icon: "👤",
            description: "Maintain character across scenes",
            template: {
                character_profile: {
                    id: "character_001",
                    core_identity: {
                        demographics: "Specify age, gender, ethnicity",
                        facial_structure: "Describe face shape and features",
                        hair: "Hair color, length, and style",
                        eyes: "Eye color and expression",
                        build: "Height and body type"
                    },
                    signature_elements: {
                        style: "Fashion preferences",
                        colors: ["Primary color", "Secondary color", "Accent color"],
                        accessories: ["Key accessory 1", "Key accessory 2"]
                    },
                    personality_markers: {
                        default_expression: "Typical facial expression",
                        body_language: "Posture and demeanor",
                        energy: "Overall vibe"
                    }
                },
                scene_adaptation: {
                    context: "Scene description",
                    modifications: {
                        clothing: "Outfit for this scene",
                        props: ["Prop 1", "Prop 2"],
                        expression: "Current emotion",
                        lighting: "Lighting setup"
                    }
                }
            }
        },
        product: {
            name: "Product Photography",
            icon: "📦",
            description: "Commercial product shots",
            template: {
                product_shot: {
                    subject: {
                        type: "Product category",
                        brand: "Brand name",
                        model: "Product model",
                        color: "Primary color",
                        material: "Surface material"
                    },
                    composition: {
                        angle: "Camera angle",
                        framing: "Shot type",
                        background: "Background style",
                        props: ["Supporting element 1", "Supporting element 2"]
                    },
                    lighting: {
                        setup: "Three-point studio lighting",
                        key_light: "Main light direction",
                        fill_light: "Fill light intensity",
                        rim_light: "Backlighting"
                    },
                    style: {
                        mood: "Commercial, minimal, lifestyle",
                        finish: "Matte, glossy, textured",
                        post_processing: "Color grading style"
                    }
                }
            }
        },
        cinematic: {
            name: "Cinematic Scene",
            icon: "🎬",
            description: "Movie-quality compositions",
            template: {
                scene_layers: {
                    foreground: {
                        elements: ["Element 1", "Element 2"],
                        lighting: "Foreground lighting",
                        focus: "Sharp or soft"
                    },
                    midground: {
                        subject: {
                            type: "Main subject",
                            action: "What they're doing",
                            emotion: "Emotional state"
                        },
                        atmosphere: "Environmental effects"
                    },
                    background: {
                        environment: "Location description",
                        depth_of_field: "Focus level",
                        mood: "Background atmosphere"
                    }
                },
                cinematography: {
                    camera: {
                        angle: "Camera position",
                        movement: "Static or dynamic",
                        lens: "Focal length"
                    },
                    color_grading: "Color treatment",
                    aspect_ratio: "Frame dimensions"
                }
            }
        },
        portrait: {
            name: "Portrait Style",
            icon: "🖼️",
            description: "Professional headshots",
            template: {
                subject: {
                    pose: "Three-quarter view",
                    expression: "Natural smile",
                    gaze: "Looking at camera",
                    hands: "Relaxed at sides"
                },
                lighting: {
                    pattern: "Rembrandt lighting",
                    key_light: "45 degrees camera left",
                    fill_ratio: "2:1",
                    background_light: "Subtle rim"
                },
                background: {
                    type: "Studio backdrop",
                    color: "Neutral gray",
                    texture: "Smooth gradient",
                    separation: "Subtle vignette"
                },
                style: {
                    mood: "Professional",
                    processing: "Natural color",
                    retouching: "Minimal"
                }
            }
        },
        landscape: {
            name: "Landscape Art",
            icon: "🏞️",
            description: "Natural environments",
            template: {
                environment: {
                    location: "Natural setting",
                    time_of_day: "Golden hour",
                    weather: "Weather conditions",
                    season: "Time of year"
                },
                composition: {
                    foreground: "Foreground elements",
                    midground: "Main landscape features",
                    background: "Sky and distant elements",
                    focal_point: "Visual anchor"
                },
                atmosphere: {
                    lighting: "Natural light quality",
                    mood: "Emotional tone",
                    color_palette: ["Dominant color", "Secondary color", "Accent color"]
                },
                style: {
                    artistic_influence: "Photorealistic, painterly, etc",
                    detail_level: "Hyper-detailed or impressionistic",
                    post_processing: "HDR, vintage, etc"
                }
            }
        }
    },
    
    // Professional flyer templates
    flyers: {
        event: {
            name: "Event Flyer",
            icon: "🎉",
            description: "Concerts, conferences, parties",
            variables: ["event_title", "event_subtitle", "event_date", "event_time", "venue_name", "ticket_price"],
            template: {
                template_type: "event_flyer",
                template_version: "1.0",
                scene: "professional event flyer design",
                layout: {
                    orientation: "portrait",
                    size: "8.5x11 inches",
                    resolution: "300 dpi",
                    composition: "hierarchical layout with clear information flow"
                },
                content: {
                    headline: "{{event_title}}",
                    subheadline: "{{event_subtitle}}",
                    main_text: "{{event_description}}",
                    call_to_action: "{{cta_text}}",
                    details: {
                        date: "{{event_date}}",
                        time: "{{event_time}}",
                        location: "{{venue_name}}\n{{venue_address}}",
                        contact: "{{contact_info}}",
                        website: "{{website_url}}",
                        price: "{{ticket_price}}"
                    }
                },
                visual_elements: {
                    hero_image: {
                        description: "{{main_image_description}}",
                        position: "top third of flyer",
                        style: "high-quality photograph or illustration",
                        aspect_ratio: "16:9"
                    },
                    background: {
                        type: "{{background_style}}",
                        colors: ["{{primary_color}}", "{{secondary_color}}"],
                        pattern: "{{background_pattern}}"
                    },
                    decorative_elements: [
                        "{{decorative_element_1}}",
                        "{{decorative_element_2}}"
                    ]
                },
                typography: {
                    headline_font: {
                        family: "{{headline_font_family}}",
                        size: "36-42pt",
                        weight: "bold",
                        color: "{{headline_color}}"
                    },
                    subheadline_font: {
                        family: "{{subheadline_font_family}}",
                        size: "18-24pt",
                        weight: "medium",
                        color: "{{subheadline_color}}"
                    },
                    body_font: {
                        family: "{{body_font_family}}",
                        size: "12-14pt",
                        weight: "regular",
                        color: "{{body_text_color}}"
                    }
                },
                color_scheme: {
                    primary: "{{primary_brand_color}}",
                    secondary: "{{secondary_brand_color}}",
                    accent: "{{accent_color}}",
                    background: "{{background_color}}",
                    text: "{{main_text_color}}"
                },
                style: {
                    overall_mood: "{{design_mood}}",
                    aesthetic: "{{design_aesthetic}}",
                    target_audience: "{{target_demographic}}"
                }
            }
        },
        
        business: {
            name: "Business Promotional",
            icon: "💼",
            description: "Services, sales, promotions",
            variables: ["business_name", "promotional_headline", "special_offer_text", "service_names", "phone_number", "email_address"],
            template: {
                template_type: "business_promotional_flyer",
                template_version: "1.0",
                scene: "professional business promotional flyer",
                layout: {
                    orientation: "portrait",
                    size: "8.5x11 inches",
                    grid_system: "3-column layout",
                    margins: "0.5 inch all sides"
                },
                branding: {
                    company_name: "{{business_name}}",
                    logo_position: "top center",
                    tagline: "{{business_tagline}}",
                    brand_colors: ["{{brand_primary}}", "{{brand_secondary}}"]
                },
                content_sections: {
                    header: {
                        main_headline: "{{promotional_headline}}",
                        offer_badge: "{{special_offer_text}}",
                        urgency_text: "{{urgency_message}}"
                    },
                    services_showcase: {
                        service_1: {
                            title: "{{service_1_name}}",
                            description: "{{service_1_description}}",
                            icon: "{{service_1_icon_description}}"
                        },
                        service_2: {
                            title: "{{service_2_name}}",
                            description: "{{service_2_description}}",
                            icon: "{{service_2_icon_description}}"
                        },
                        service_3: {
                            title: "{{service_3_name}}",
                            description: "{{service_3_description}}",
                            icon: "{{service_3_icon_description}}"
                        }
                    },
                    testimonial: {
                        quote: "{{customer_testimonial}}",
                        author: "{{testimonial_author}}",
                        rating: "{{star_rating}}"
                    },
                    contact_info: {
                        phone: "{{phone_number}}",
                        email: "{{email_address}}",
                        address: "{{business_address}}",
                        hours: "{{business_hours}}",
                        social_media: "{{social_handles}}"
                    }
                },
                visual_style: {
                    photography_style: "{{photo_style}}",
                    color_treatment: "{{color_treatment}}",
                    typography_style: "{{typography_style}}",
                    graphic_elements: ["{{graphic_element_1}}", "{{graphic_element_2}}"]
                },
                call_to_action: {
                    primary_cta: "{{main_cta_text}}",
                    secondary_cta: "{{secondary_cta_text}}",
                    button_style: "prominent button with contrasting color"
                }
            }
        },
        
        realestate: {
            name: "Real Estate Listing",
            icon: "🏠",
            description: "Property showcases",
            variables: ["property_address", "listing_price", "bedroom_count", "bathroom_count", "sqft", "realtor_name", "agent_phone"],
            template: {
                template_type: "real_estate_flyer",
                template_version: "1.0",
                scene: "professional real estate listing flyer",
                property_showcase: {
                    main_photo: {
                        description: "{{property_exterior_description}}",
                        position: "top 40% of flyer",
                        style: "high-quality real estate photography"
                    },
                    property_grid: {
                        interior_1: "{{interior_photo_1_description}}",
                        interior_2: "{{interior_photo_2_description}}",
                        interior_3: "{{interior_photo_3_description}}",
                        special_feature: "{{special_feature_photo_description}}"
                    }
                },
                property_details: {
                    headline: "{{property_headline}}",
                    address: "{{property_address}}",
                    price: "{{listing_price}}",
                    key_features: {
                        bedrooms: "{{bedroom_count}}",
                        bathrooms: "{{bathroom_count}}",
                        square_footage: "{{sqft}}",
                        lot_size: "{{lot_size}}",
                        year_built: "{{year_built}}",
                        special_features: ["{{feature_1}}", "{{feature_2}}", "{{feature_3}}"]
                    },
                    description: "{{property_description}}",
                    neighborhood_highlights: ["{{highlight_1}}", "{{highlight_2}}", "{{highlight_3}}"]
                },
                agent_info: {
                    agent_name: "{{realtor_name}}",
                    agent_photo: "professional headshot",
                    license_number: "{{license_number}}",
                    brokerage: "{{brokerage_name}}",
                    contact: {
                        phone: "{{agent_phone}}",
                        email: "{{agent_email}}",
                        website: "{{agent_website}}"
                    }
                },
                layout_style: {
                    color_scheme: ["white", "{{accent_color}}", "charcoal gray"],
                    typography: "clean, modern sans-serif",
                    visual_hierarchy: "price prominence, photo showcase, details grid"
                },
                branding_elements: {
                    brokerage_logo: "bottom right corner",
                    mls_logo: "compliance positioning",
                    qr_code: "links to virtual tour or listing page"
                }
            }
        },
        
        restaurant: {
            name: "Restaurant/Food",
            icon: "🍕",
            description: "Menu promotions, dining",
            variables: ["restaurant_name", "cuisine_style", "signature_dish", "special_offer", "phone_number", "operating_hours"],
            template: {
                template_type: "restaurant_flyer",
                template_version: "1.0",
                scene: "appetizing restaurant promotional flyer",
                food_showcase: {
                    hero_dish: {
                        description: "{{signature_dish_description}}",
                        photography_style: "professional food photography with dramatic lighting",
                        position: "center focal point"
                    },
                    menu_highlights: [
                        {
                            dish_name: "{{dish_1_name}}",
                            description: "{{dish_1_description}}",
                            price: "{{dish_1_price}}",
                            image: "{{dish_1_photo_description}}"
                        },
                        {
                            dish_name: "{{dish_2_name}}",
                            description: "{{dish_2_description}}",
                            price: "{{dish_2_price}}",
                            image: "{{dish_2_photo_description}}"
                        },
                        {
                            dish_name: "{{dish_3_name}}",
                            description: "{{dish_3_description}}",
                            price: "{{dish_3_price}}",
                            image: "{{dish_3_photo_description}}"
                        }
                    ]
                },
                restaurant_info: {
                    name: "{{restaurant_name}}",
                    cuisine_type: "{{cuisine_style}}",
                    tagline: "{{restaurant_tagline}}",
                    special_offer: "{{current_promotion}}",
                    location: "{{restaurant_address}}",
                    hours: "{{operating_hours}}",
                    contact: {
                        phone: "{{phone_number}}",
                        website: "{{website_url}}",
                        delivery_apps: ["{{delivery_app_1}}", "{{delivery_app_2}}"]
                    }
                },
                visual_design: {
                    color_palette: {
                        primary: "{{brand_color}}",
                        food_colors: ["{{appetizing_color_1}}", "{{appetizing_color_2}}"],
                        background: "{{background_tone}}"
                    },
                    typography: {
                        restaurant_name: "elegant script or bold sans-serif",
                        menu_items: "clean, readable font",
                        descriptions: "lighter weight, appetizing styling"
                    },
                    decorative_elements: [
                        "{{cuisine_themed_graphics}}",
                        "{{decorative_borders}}",
                        "{{chef_illustrations}}"
                    ]
                },
                atmosphere: {
                    dining_style: "{{restaurant_atmosphere}}",
                    target_audience: "{{target_customer_type}}",
                    mood: "{{desired_mood}}"
                }
            }
        },
        
        product_launch: {
            name: "Product Launch",
            icon: "🚀",
            description: "New product announcements",
            variables: ["product_name", "launch_date", "standard_price", "introductory_price", "key_features"],
            template: {
                template_type: "product_launch_flyer",
                template_version: "1.0",
                scene: "dynamic product launch announcement flyer",
                product_showcase: {
                    hero_product: {
                        name: "{{product_name}}",
                        image_description: "{{product_photo_description}}",
                        positioning: "center stage with dramatic lighting",
                        style: "professional product photography"
                    },
                    key_features: [
                        {
                            feature: "{{feature_1_name}}",
                            benefit: "{{feature_1_benefit}}",
                            icon: "{{feature_1_icon_description}}"
                        },
                        {
                            feature: "{{feature_2_name}}",
                            benefit: "{{feature_2_benefit}}",
                            icon: "{{feature_2_icon_description}}"
                        },
                        {
                            feature: "{{feature_3_name}}",
                            benefit: "{{feature_3_benefit}}",
                            icon: "{{feature_3_icon_description}}"
                        }
                    ]
                },
                launch_details: {
                    announcement: "{{launch_announcement}}",
                    availability_date: "{{launch_date}}",
                    pricing: {
                        regular_price: "{{standard_price}}",
                        launch_special: "{{introductory_price}}",
                        savings_highlight: "{{discount_amount}}"
                    },
                    where_to_buy: [
                        "{{retailer_1}}",
                        "{{retailer_2}}",
                        "{{online_store}}"
                    ]
                },
                brand_elements: {
                    company_logo: "{{brand_logo_placement}}",
                    brand_colors: ["{{primary_brand_color}}", "{{secondary_brand_color}}"],
                    brand_messaging: "{{brand_voice_description}}"
                },
                visual_impact: {
                    energy_level: "{{design_energy}}",
                    color_strategy: "{{color_psychology}}",
                    graphic_style: "{{graphic_treatment}}",
                    background_elements: ["{{bg_element_1}}", "{{bg_element_2}}"]
                },
                social_proof: {
                    awards: "{{product_awards}}",
                    endorsements: "{{celebrity_endorsement}}",
                    early_reviews: "{{preview_testimonial}}"
                }
            }
        },
        
        educational: {
            name: "Educational/Informational",
            icon: "📚",
            description: "Courses, workshops, info",
            variables: ["educational_topic", "learning_objectives", "organization_name", "contact_details"],
            template: {
                template_type: "educational_flyer",
                template_version: "1.0",
                scene: "clean, informative educational flyer design",
                content_structure: {
                    main_topic: "{{educational_topic}}",
                    subtitle: "{{topic_subtitle}}",
                    learning_objectives: [
                        "{{objective_1}}",
                        "{{objective_2}}",
                        "{{objective_3}}"
                    ],
                    key_sections: [
                        {
                            section_title: "{{section_1_title}}",
                            content: "{{section_1_content}}",
                            visual_aid: "{{section_1_graphic_description}}"
                        },
                        {
                            section_title: "{{section_2_title}}",
                            content: "{{section_2_content}}",
                            visual_aid: "{{section_2_graphic_description}}"
                        },
                        {
                            section_title: "{{section_3_title}}",
                            content: "{{section_3_content}}",
                            visual_aid: "{{section_3_graphic_description}}"
                        }
                    ],
                    call_to_action: "{{educational_cta}}"
                },
                visual_aids: {
                    infographic_elements: [
                        "{{chart_description}}",
                        "{{diagram_description}}",
                        "{{icon_set_description}}"
                    ],
                    illustration_style: "{{illustration_approach}}",
                    data_visualization: "{{data_viz_style}}"
                },
                design_approach: {
                    information_hierarchy: "clear, scannable layout",
                    color_coding: {
                        primary_info: "{{primary_info_color}}",
                        secondary_info: "{{secondary_info_color}}",
                        highlights: "{{highlight_color}}"
                    },
                    typography: {
                        headers: "bold, clear sans-serif",
                        body_text: "highly readable font",
                        captions: "smaller, muted styling"
                    }
                },
                audience_targeting: {
                    education_level: "{{target_education_level}}",
                    age_group: "{{target_age_range}}",
                    prior_knowledge: "{{assumed_knowledge_level}}"
                },
                organization_info: {
                    institution_name: "{{organization_name}}",
                    department: "{{department_name}}",
                    contact_info: "{{contact_details}}",
                    additional_resources: "{{resource_links}}"
                }
            }
        },
        
        fitness: {
            name: "Fitness/Health",
            icon: "💪",
            description: "Gym services, wellness",
            variables: ["gym_name", "motivational_headline", "class_names", "membership_prices", "trial_offer"],
            template: {
                template_type: "fitness_health_flyer",
                template_version: "1.0",
                scene: "energetic fitness and wellness promotional flyer",
                motivational_elements: {
                    main_headline: "{{motivational_headline}}",
                    transformation_promise: "{{transformation_message}}",
                    success_imagery: "{{fitness_success_photo_description}}"
                },
                service_offerings: {
                    primary_service: {
                        name: "{{main_service_name}}",
                        description: "{{service_description}}",
                        benefits: ["{{benefit_1}}", "{{benefit_2}}", "{{benefit_3}}"],
                        visual: "{{service_photo_description}}"
                    },
                    class_schedule: [
                        {
                            class_name: "{{class_1_name}}",
                            time: "{{class_1_time}}",
                            difficulty: "{{class_1_level}}"
                        },
                        {
                            class_name: "{{class_2_name}}",
                            time: "{{class_2_time}}",
                            difficulty: "{{class_2_level}}"
                        },
                        {
                            class_name: "{{class_3_name}}",
                            time: "{{class_3_time}}",
                            difficulty: "{{class_3_level}}"
                        }
                    ],
                    membership_options: {
                        basic_plan: "{{basic_membership_details}}",
                        premium_plan: "{{premium_membership_details}}",
                        trial_offer: "{{trial_membership_offer}}"
                    }
                },
                facility_info: {
                    gym_name: "{{fitness_facility_name}}",
                    location: "{{facility_address}}",
                    amenities: ["{{amenity_1}}", "{{amenity_2}}", "{{amenity_3}}"],
                    equipment_highlights: "{{equipment_description}}",
                    facility_photos: "{{facility_interior_description}}"
                },
                trainer_spotlight: {
                    trainer_name: "{{featured_trainer_name}}",
                    credentials: "{{trainer_qualifications}}",
                    specialization: "{{trainer_specialty}}",
                    photo: "professional trainer photo in action"
                },
                visual_energy: {
                    color_scheme: ["{{energetic_color_1}}", "{{energetic_color_2}}", "{{motivational_color}}"],
                    imagery_style: "dynamic, action-oriented photography",
                    graphic_elements: ["{{fitness_icons}}", "{{motivational_graphics}}"],
                    overall_mood: "{{fitness_motivation_mood}}"
                },
                social_proof: {
                    member_testimonial: "{{member_success_story}}",
                    before_after: "{{transformation_description}}",
                    community_size: "{{member_count}}"
                }
            }
        }
    }
}

// Helper functions for template management
export const templateHelpers = {
    // Get all template categories
    getCategories() {
        return Object.keys(professionalTemplates)
    },
    
    // Get templates by category
    getTemplatesByCategory(category: string) {
        return professionalTemplates[category as keyof typeof professionalTemplates] || {}
    },
    
    // Get a specific template
    getTemplate(category: string, templateKey: string) {
        const categoryTemplates = professionalTemplates[category as keyof typeof professionalTemplates]
        return categoryTemplates?.[templateKey as keyof typeof categoryTemplates] || null
    },
    
    // Extract variables from a template
    extractVariables(template: any): string[] {
        const variables = new Set<string>()
        const extractFromObject = (obj: any) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    const matches = obj[key].match(/\{\{(\w+)\}\}/g)
                    if (matches) {
                        matches.forEach((match: string) => {
                            variables.add(match.replace(/\{\{|\}\}/g, ''))
                        })
                    }
                } else if (typeof obj[key] === 'object') {
                    extractFromObject(obj[key])
                }
            }
        }
        extractFromObject(template)
        return Array.from(variables)
    },
    
    // Replace variables in template with values
    fillTemplate(template: any, values: Record<string, string>) {
        const filled = JSON.parse(JSON.stringify(template)) // Deep clone
        const fillObject = (obj: any) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    obj[key] = obj[key].replace(/\{\{(\w+)\}\}/g, (match: string, variable: string) => {
                        return values[variable] || match
                    })
                } else if (typeof obj[key] === 'object') {
                    fillObject(obj[key])
                }
            }
        }
        fillObject(filled)
        return filled
    }
}