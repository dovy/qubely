<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

if (!class_exists('QUBELY_Options')) {

    class QUBELY_Options
    {
        // Constructor
        public function __construct()
        {
            add_action('admin_menu', array($this, 'add_admin_menu'), PHP_INT_MAX);
            add_action('admin_init', array($this, 'register_settings'));
        }

        /**
         * Add Menu Page Callback
         *
         * @since 1.0.0
         */
        public  function add_admin_menu()
        {
            add_submenu_page(
                    'qubely-getting-started',
                esc_html__('Qubely Settings', 'qubely'),
                esc_html__('Settings', 'qubely'),
                'manage_options',
                'qubely-settings',
                array($this, 'create_admin_page')
            );
        }

        /**
         * Register a setting and its sanitization callback.
         *
         * @since 1.0.0
         */
        public function register_settings()
        {
            register_setting('qubely_options', 'qubely_options', array($this, 'sanitize'));
        }

        /**
         * Sanitization callback
         *
         * @since 1.0.0
         */
        public  function sanitize($options)
        {
            if ($options) {
                if (!empty($options['css_save_as'])) {
                    $options['css_save_as'] = sanitize_text_field($options['css_save_as']);
                }
                if(!empty($options['gmap_api_key'])) {
                    $options['gmap_api_key'] = sanitize_text_field($options['gmap_api_key']);
                }
                if(!empty($options['recaptcha_site_key'])) {
                    $options['recaptcha_site_key'] = sanitize_text_field($options['recaptcha_site_key']);
                }
                if(!empty($options['recaptcha_secret_key'])) {
                    $options['recaptcha_secret_key'] = sanitize_text_field($options['recaptcha_secret_key']);
                }
            }
            return $options;
        }

        /**
         * Settings page output
         *
         * @since 1.0.0
         */

        public function create_admin_page()
        {
            $current_tab = !empty($_GET['tab']) ? $_GET['tab'] : 'configuration';

            ?>
            <div class="wrap">
                <h2><?php esc_html_e('Qubely Settings', 'qubely'); ?></h2>
                <nav class="nav-tab-wrapper wp-clearfix">
                    <a href="?page=qubely-settings&tab=configuration" class="nav-tab <?php echo (empty($current_tab) || $current_tab === 'configuration') ? 'nav-tab-active' : '' ?>">
                        <?php esc_html_e('Configuration', 'qubely'); ?>
                    </a>
                    <a href="?page=qubely-settings&tab=advanced" class="nav-tab <?php echo $current_tab === 'advanced' ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Advanced', 'qubely'); ?></a>
                </nav>
                <form method="post" action="options.php">
                    <?php
                        settings_fields('qubely_options');
                        $option_data    = get_option('qubely_options');
                    ?>

                    <div id="tab-configuration" class="qubely-admin-tab-content qubely-admin-tab-active" style="display: <?php echo (empty($current_tab) || $current_tab === 'configuration') ? 'block' : 'none'; ?>">
                        <table class="form-table">
                            <tr>
                                <th><?php esc_html_e('Google Map API Key', 'qubely'); ?></th>
                                <td>
                                    <input type="text" value="<?php echo $option_data['gmap_api_key']; ?>" name="qubely_options[gmap_api_key]" placeholder="xxxx-xxxx-xxxx-xxxx" class="regular-text code" />
                                    <p class="description">
                                        <?php printf(__('Enter Google map API key, %s or Generate one %s', 'qubely'), '<a href="//developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">', '</a>'); ?>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <?php esc_html_e('Google reCAPTCHA', 'qubely'); ?>
                                </th>
                                <td>
                                    <div>
                                        <input type="text" value="<?php echo $option_data['recaptcha_site_key']; ?>" name="qubely_options[recaptcha_site_key]" placeholder="Enter reCAPTCHA site key"  class="regular-text code" />
                                        <p class="description">
                                            <?php _e('Enter Site key', 'qubely'); ?>
                                        </p>
                                    </div>
                                    <br>
                                    <div>
                                        <input type="text" value="<?php echo $option_data['recaptcha_secret_key']; ?>" name="qubely_options[recaptcha_secret_key]" placeholder="Enter reCAPTCHA secret key"  class="regular-text code" />
                                        <p class="description">
                                            <?php printf(__('Enter Secret key, %s or Generate reCAPTCHA Keys %s', 'qubely'), '<a href="//www.google.com/recaptcha/admin/" target="_blank">', '</a>'); ?>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id="tab-advanced" class="qubely-admin-tab-content" style="display: <?php echo $current_tab === 'advanced' ? 'block' : 'none'; ?>">
                        <table class="form-table">
                            <tr>
                                <th scope="row"><?php esc_html_e('CSS Save Method', 'qubely'); ?></th>
                                <td>
                                    <?php $value = $option_data['css_save_as']; ?>
                                    <select name="qubely_options[css_save_as]">
                                        <?php
                                        $options = array(
                                            'wp_head'   => __('Header', 'qubely'),
                                            'filesystem' => __('File System', 'qubely'),
                                        );
                                        foreach ($options as $id => $label) { ?>
                                            <option value="<?php echo esc_attr($id); ?>" <?php selected($value, $id, true); ?>>
                                                <?php echo strip_tags($label); ?>
                                            </option>
                                        <?php } ?>
                                    </select>
                                    <p class="description"> <?php _e('Select where you want to save CSS.', 'qubely'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <?php submit_button(); ?>
                </form>
            </div>
        <?php }
    }
}
