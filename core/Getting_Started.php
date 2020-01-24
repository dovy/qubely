<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

if(!class_exists('Qubely_Getting_Started')) {
    class Qubely_Getting_Started {

        public function __construct()
        {
            add_action('admin_menu', array($this, 'add_admin_menu'));
        }

        /**
         * Add Menu Page Callback
         *
         * @since 1.0.0
         */
        public  function add_admin_menu()
        {
            add_menu_page(
                'Qubely',
                'Qubely',
                'manage_options',
                'qubely-getting-started',
                array(),
                QUBELY_DIR_URL . 'assets/img/qubely-logo-white.svg'
            );
            add_submenu_page(
                'qubely-getting-started',
                'Getting Started',
                'Getting Started',
                'manage_options',
                'qubely-getting-started',
                array($this, 'create_admin_page')
            );
        }

        /**
         * Settings page output
         *
         * @since 1.0.0
         */
        public function create_admin_page()
        { ?>
            <div class="wrap">
                <div class="qubely-options-section qubely-mt-20 qubely-mb-30" style="background-image: url(<?php echo QUBELY_DIR_URL . 'assets/img/options-logo.png' ?>)">
                    <div class="qubely-options-section-header">
                        <div class="qubely-header-left">
                            <h2 class="qubely-options-section-title"><?php esc_attr_e('Welcome to Qubely! - Version ', 'qubely');
                                echo QUBELY_VERSION; ?></h2>
                            <h3 class="qubely-options-section-subtitle"><?php esc_attr_e('Full-Fledged Gutenburg Toolkit', 'qubely') ?></h3>
                        </div>
                        <div class="qubely-header-right qubely-option-logo">
                            <img src="<?php echo QUBELY_DIR_URL . 'assets/img/logo.svg' ?>" alt="Logo">
                        </div>
                    </div>

                    <h4 class="qubely-options-section-title">
                        <?php esc_attr_e('Qubely Core Features', 'qubely') ?>
                        <img src="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@1x.png'; ?>" srcset="<?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@1x.png'; ?> 1x, <?php echo  QUBELY_DIR_URL . 'assets/img/admin/thumbs-up@2x.png'; ?> 2x" alt="<?php echo esc_attr('Features'); ?>">
                    </h4>
                    <div class="qubely-row qubely-columns-2">
                        <div>
                            <ul class="qubely-options-features">
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Predefined sections'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Modern layout packs'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Highly customizable row columns'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Row video background & blend mode'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Drag column resizing'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Shape divider/builder'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Device specific responsive controls'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Unlimited Google fonts & system fonts'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Classic & gradient color background'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Built-in animation'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Box-shadow'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Font Awesome 5 Icons and line icons'); ?></li>
                                <li><i class="fas fa-check"></i> <?php esc_attr_e('Custom CSS'); ?></li>
                            </ul>
                            <div class="qubely-mb-30">
                                <a href="https://www.themeum.com/docs/qubely-introduction/" target="_blank" class="button button-large button-primary"><?php esc_attr_e('Documentation'); ?></a>
                            </div>
                        </div>
                        <div>
                            <div class="qubely-embed-responsive">
                                <iframe class="qubely-embed-responsive-item" src="https://www.youtube.com/embed/oLFeWSS9HhU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php }
    }
}