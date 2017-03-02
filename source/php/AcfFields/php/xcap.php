<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_56af507bbd485',
    'title' => 'Xcap',
    'fields' => array(
        0 => array(
            'key' => 'field_56b055179e151',
            'label' => __('Daily import', 'event-manager'),
            'name' => 'xcap_daily_cron',
            'type' => 'true_false',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'message' => __('Enable daily automatic import from XCAP', 'event-manager'),
            'default_value' => 1,
        ),
        1 => array(
            'key' => 'field_56b06bfae69e2',
            'label' => __('Post status', 'event-manager'),
            'name' => 'xcap_post_status',
            'type' => 'radio',
            'instructions' => __('Select status of imported events.', 'event-manager'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'draft' => __('Draft', 'event-manager'),
                'publish' => __('Published', 'event-manager'),
            ),
            'allow_null' => 0,
            'other_choice' => 0,
            'save_other_choice' => 0,
            'default_value' => 'publish',
            'layout' => 'vertical',
            'return_format' => 'value',
        ),
        2 => array(
            'key' => 'field_587cc39d5ebc9',
            'label' => __('API links', 'event-manager'),
            'name' => 'xcap_api_urls',
            'type' => 'repeater',
            'instructions' => __('Add one or many API links to Xcap', 'event-manager'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'collapsed' => '',
            'min' => '',
            'max' => '',
            'layout' => 'block',
            'button_label' => 'Add',
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_587cc3c55ebca',
                    'label' => __('API link', 'event-manager'),
                    'name' => 'xcap_api_url',
                    'type' => 'url',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                ),
                1 => array(
                    'key' => 'field_587cc3dc5ebcb',
                    'label' => __('Exclude categories', 'event-manager'),
                    'name' => 'xcap_filter_categories',
                    'type' => 'text',
                    'instructions' => __('Enter the name of the categories that you want to exclude from the import. Separate with commas.', 'event-manager'),
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                ),
                2 => array(
                    'key' => 'field_587cc3fe5ebcc',
                    'label' => __('Default user groups', 'event-manager'),
                    'name' => 'xcap_publishing_groups',
                    'type' => 'taxonomy',
                    'instructions' => __('Select the user groups that you want to set as default to imported posts.', 'event-manager'),
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'taxonomy' => 'user_groups',
                    'field_type' => 'checkbox',
                    'allow_null' => 0,
                    'add_term' => 0,
                    'save_terms' => 1,
                    'load_terms' => 0,
                    'return_format' => 'id',
                    'multiple' => 0,
                ),
            ),
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'acf-options-options',
            ),
        ),
    ),
    'menu_order' => 2,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
    'local' => 'json',
));
}