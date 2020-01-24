const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, TextareaControl, Toolbar } = wp.components;
const {
    Styles,
    Range,
    Toggle,
    Typography,
    Color,
    Tabs,
    Tab,
    Border,
    RadioAdvanced,
    QubelyButtonEdit,
    BorderRadius,
    Separator,
    gloalSettings: {
        globalSettingsPanel,
        animationSettings
    },
    Inline: { InlineToolbar },
    QubelyButton: { buttonSettings },
    CssGenerator: { CssGenerator },
    ContextMenu: { ContextMenu, handleContextMenu },
} = wp.qubelyComponents

import icons from '../../helpers/icons'


class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true,
            selectedItem: -1,
        }
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }

        setAttributes({
            reCaptchaSecretKey: qubely_admin.recaptcha_site_key,
            reCaptchaSiteKey: qubely_admin.recaptcha_secret_key
        });
    }

    setSettings(type, val, index = -1) {
        const selectedItem = (index !== -1) ? index : this.state.selectedItem;
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems[selectedItem][type] = val;
        setAttributes({ formItems });
    }

    render() {
        const { selectedItem, device } = this.state;
        const { name, clientId, attributes, setAttributes } = this.props;
        const {
            uniqueId,
            className,
            formItems,
            labelTypography,
            labelColor,
            labelColorFocus,
            inputTypography,
            inputColor,
            inputColorFocus,
            inputColorHover,
            inputBg,
            inputBgFocus,
            inputBgHover,
            inputBorder,
            inputBorderMaterial,
            inputBorderColorFocus,
            inputBorderColorHover,
            inputBorderRadius,
            inputSize,
            inputPaddingX,
            inputPaddingY,
            textareaHeight,
            placeholderColor,
            placeholderColorFocus,
            placeholderColorHover,
            enableButton,
            buttonTag,
            buttonSize,
            buttonFillType,
            buttonText,
            buttonIconName,
            buttonIconPosition,
            spacing, gutter,
            fieldErrorMessage,
            formSuccessMessage,
            formErrorMessage,
            reCaptcha,
            reCaptchaSiteKey,
            reCaptchaSecretKey,
            emailReceiver,
            emailHeaders,
            emailFrom,
            emailSubject,
            emailBody,
            layout,
            animation,
            enablePosition,
            selectPosition,
            positionXaxis,
            positionYaxis,
            globalZindex,
            hideTablet,
            hideMobile,
            globalCss } = attributes;

        if (uniqueId) { CssGenerator(this.props.attributes, 'contactform', uniqueId); }

        const apiSuccessStyle = {
            color: '#155724',
            fontStyle: 'italic',
            padding: '10px',
            background: '#d4edda',
            border: '1px solid #c3e6cb'
        }

        const apiErrorStyle = {
            color: '#856404',
            fontStyle: 'italic',
            padding: '10px',
            background: '#fff3cd',
            border: '1px solid #ffeeba'
        }

        const ApiLink = text => <a href={qubely_admin.setting_url} target="_blank">{text}</a>;

        return (
            <Fragment>
                <InspectorControls key="inspector">

                    <PanelBody title={__('')} initialOpen={true}>
                        <Styles
                            value={layout}
                            onChange={val => setAttributes({ layout: val })}
                            options={[
                                { value: 'classic', img: icons.form_classic, label: __('Classic') },
                                { value: 'material', img: icons.form_material, label: __('Material') },
                            ]}
                        />
                    </PanelBody>

                    {selectedItem >= 0 &&
                        <PanelBody title={(formItems[selectedItem].label) ? formItems[selectedItem].label : __('Input Settings')}>

                            <TextControl
                                label={__('Label')}
                                value={formItems[selectedItem].label}
                                onChange={val => this.setSettings('label', val)}
                                placeholder={__('Enter Label')}
                            />

                            <TextControl
                                label={__('Name')}
                                value={formItems[selectedItem].name}
                                onChange={val => this.setSettings('name', val)}
                                placeholder={__('Enter Name')}
                                help={__('You must write field name with hyphen(-) with lowercase. No space, UPPERCASE, Capitalize is not allowed. This name should match with Form template value. Never keep empty this name.')}
                            />

                            <TextControl
                                label={__('Placeholder')}
                                value={formItems[selectedItem].placeholder}
                                onChange={val => this.setSettings('placeholder', val)}
                                placeholder={__('Enter Placeholder')}
                            />

                            <Range
                                label={__('Width')}
                                value={formItems[selectedItem].width}
                                onChange={(val) => this.setSettings('width', val)}
                                max={100}
                                min={33}
                                responsive
                                device={device}
                                onDeviceChange={value => this.setState({ device: value })}
                            />
                            <Toggle
                                label={__('Required')}
                                value={formItems[selectedItem].required}
                                onChange={val => this.setSettings('required', val)}
                            />
                            {layout == 'classic' &&
                                <Toggle
                                    label={__('Hide Label')}
                                    value={formItems[selectedItem].hideLabel}
                                    onChange={val => this.setSettings('hideLabel', val)}
                                />
                            }
                        </PanelBody>
                    }

                    <PanelBody title={__('Label')} initialOpen={false}>
                        <Typography
                            label={__('Typography')}
                            value={labelTypography}
                            onChange={val => setAttributes({ labelTypography: val })}
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Color
                            label={__('Color')}
                            value={labelColor}
                            onChange={val => setAttributes({ labelColor: val })}
                        />
                        {layout == 'material' &&
                            <Color
                                label={__('Focus Color')}
                                value={labelColorFocus}
                                onChange={val => setAttributes({ labelColorFocus: val })}
                            />
                        }
                    </PanelBody>

                    <PanelBody title={__('Input')} initialOpen={false}>
                        <RadioAdvanced
                            label={__('Input Size')}
                            options={[
                                { label: 'S', value: 'small', title: 'Small' },
                                { label: 'M', value: 'medium', title: 'Medium' },
                                { label: 'L', value: 'large', title: 'Large' },
                                { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                            ]}
                            value={inputSize}
                            onChange={(value) => setAttributes({ inputSize: value })}
                        />
                        {inputSize == 'custom' &&
                            <Fragment>
                                <Range
                                    label={<span className="dashicons dashicons-sort" title="Padding Y" />}
                                    value={inputPaddingY}
                                    onChange={(value) => setAttributes({ inputPaddingY: value })}
                                    unit={['px', 'em', '%']}
                                    min={0}
                                    max={50}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />

                                {layout == 'classic' &&
                                    <Range
                                        label={<span className="dashicons dashicons-leftright" title="X Padding" />}
                                        value={inputPaddingX}
                                        onChange={(value) => setAttributes({ inputPaddingX: value })}
                                        unit={['px', 'em', '%']}
                                        min={0}
                                        max={50}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                }
                                <Separator />
                            </Fragment>
                        }
                        <Range
                            label={__('Textarea Height')}
                            value={textareaHeight}
                            onChange={(value) => setAttributes({ textareaHeight: value })}
                            unit={['px', 'em', '%']}
                            min={100}
                            max={500}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Spacing')}
                            value={spacing}
                            onChange={(value) => setAttributes({ spacing: value })}
                            unit={['px', 'em', '%']}
                            min={0}
                            max={60}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Range
                            label={__('Gutter')}
                            value={gutter}
                            onChange={(value) => setAttributes({ gutter: value })}
                            unit={['px', 'em', '%']}
                            min={0}
                            max={60}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Tabs>
                            <Tab tabTitle={__('Normal')}>
                                <Color label={__('Color')} value={inputColor} onChange={val => setAttributes({ inputColor: val })} />
                                {layout == 'classic' &&
                                    <Color label={__('Background Color')} value={inputBg} onChange={val => setAttributes({ inputBg: val })} />
                                }
                                <Color label={__('Placeholder Color')} value={placeholderColor} onChange={val => setAttributes({ placeholderColor: val })} />
                                <Separator />
                                {layout == 'classic' &&
                                    <Border label={__('Border')} value={inputBorder} onChange={val => setAttributes({ inputBorder: val })} min={0} max={10} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                }
                                {layout == 'material' &&
                                    <Border label={__('Border')} value={inputBorderMaterial} onChange={val => setAttributes({ inputBorderMaterial: val })} min={0} max={10} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                }
                            </Tab>
                            <Tab tabTitle={__('Focus')}>
                                <Color label={__('Color')} value={inputColorFocus} onChange={val => setAttributes({ inputColorFocus: val })} />
                                {layout == 'classic' &&
                                    <Color label={__('Background Color')} value={inputBgFocus} onChange={val => setAttributes({ inputBgFocus: val })} />
                                }
                                <Color label={__('Placeholder Color')} value={placeholderColorFocus} onChange={val => setAttributes({ placeholderColorFocus: val })} />
                                <Color label={__('Border Color')} value={inputBorderColorFocus} onChange={(value) => setAttributes({ inputBorderColorFocus: value })} />
                            </Tab>
                            <Tab tabTitle={__('Hover')}>
                                <Color label={__('Color')} value={inputColorHover} onChange={val => setAttributes({ inputColorHover: val })} />
                                {layout == 'classic' &&
                                    <Color label={__('Background Color')} value={inputBgHover} onChange={val => setAttributes({ inputBgHover: val })} />
                                }
                                <Color label={__('Placeholder Color')} value={placeholderColorHover} onChange={val => setAttributes({ placeholderColorHover: val })} />
                                <Color label={__('Border Color')} value={inputBorderColorHover} onChange={(value) => setAttributes({ inputBorderColorHover: value })} />
                            </Tab>
                        </Tabs>

                        <BorderRadius
                            label={__('Radius')}
                            value={inputBorderRadius}
                            onChange={(value) => setAttributes({ inputBorderRadius: value })}
                            min={0}
                            max={100} unit={['px', 'em', '%']}
                            responsive
                            device={device}
                            onDeviceChange={value => this.setState({ device: value })}
                        />
                        <Typography label={__('Typography')} value={inputTypography} onChange={val => setAttributes({ inputTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                    </PanelBody>

                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <Tabs>
                            <Tab tabTitle={__('Form')}>
                                <TextControl
                                    label={__('Required Field Error Message')}
                                    value={fieldErrorMessage}
                                    onChange={val => setAttributes({ fieldErrorMessage: val })}
                                    help={__('Set required field error message here. Leave blank for default message.')}
                                />
                                <TextareaControl
                                    label={__('Form Submit Success Message')}
                                    value={formSuccessMessage}
                                    onChange={val => setAttributes({ formSuccessMessage: val })}
                                    help={__('Set your desired message after successful form submission. Leave blank for default.')}
                                />
                                <TextareaControl
                                    label={__('Form Submit Failed Message')}
                                    value={formErrorMessage}
                                    onChange={val => setAttributes({ formErrorMessage: val })}
                                    help={__('Set your desired message for form submission error. Leave blank for default.')}
                                />
                                <Toggle disabled label={__('Enable reCAPTCHA')} value={reCaptcha} onChange={val => setAttributes({ reCaptcha: val })} />
                                {reCaptcha &&
                                    <Fragment>
                                        {
                                            (reCaptchaSiteKey && reCaptchaSecretKey) ? (
                                                <p style={apiSuccessStyle}>
                                                    {__('Your reCAPTCHA is activated, ')} {ApiLink(__('Edit site key & secret key'))}
                                                </p>
                                            ) : (
                                                <p style={apiErrorStyle}>
                                                    {__('Need site key & secret key to enable reCAPTCHA, ')} {ApiLink(__('Add your keys here '))}
                                                </p>
                                            )
                                        }
                                    </Fragment>
                                }
                            </Tab>
                            <Tab tabTitle={__('Email')}>
                                <TextControl
                                    label={__('Recipient Email')}
                                    value={emailReceiver}
                                    onChange={val => setAttributes({ emailReceiver: val })}
                                    placeholder={__('Enter Recipient Email')}
                                    help={__('Enter the recipient email address. This field is mandatory. Without a recipient email, contact form will not work.')}
                                />
                                <TextareaControl
                                    label={__('Email Headers')}
                                    value={emailHeaders}
                                    onChange={val => setAttributes({ emailHeaders: val })}
                                />
                                <TextControl
                                    label={__('From Email')}
                                    value={emailFrom}
                                    onChange={val => setAttributes({ emailFrom: val })}
                                    placeholder={__('Your Name: admin@example.com')}
                                />
                                <TextControl
                                    label={__('Subject')}
                                    value={emailSubject}
                                    onChange={val => setAttributes({ emailSubject: val })}
                                    placeholder={__('Enter Subject')}
                                />
                                <TextareaControl
                                    label={__('Email Body')}
                                    value={emailBody}
                                    onChange={val => setAttributes({ emailBody: val })}
                                    help={__("Set your form email body here. In editor don't add any CSS style or others option just add your form field name between double curly braces {{field-name}} as you set in 'Field Name'.")}
                                />
                            </Tab>
                        </Tabs>
                    </PanelBody>
                    {buttonSettings(this.props.attributes, device, (key, value) => { setAttributes({ [key]: value }) }, (key, value) => { this.setState({ [key]: value }) })}
                    {animationSettings(uniqueId, animation, setAttributes)}
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`qubely-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div className={`qubely-block-contact-form qubely-layout-${layout}`} onContextMenu={event => handleContextMenu(event, this.refs.qubelyContextMenu)}>
                        <form className="qubely-form">
                            {formItems.map((item, index) =>
                                <div key={index} className={`qubely-form-group qubely-form-group-index-${index}`} style={{ width: `${item.width.md}%` }}>
                                    <div className="qubely-form-group-inner">

                                        {!item.hideLabel && layout == 'classic' &&
                                            <label className="qubely-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }

                                        {/* Text and Email */}
                                        {(item.type == 'text' || item.type == 'email') &&
                                            <input className={`qubely-form-control is-${inputSize}`} type={item.type} placeholder={__(item.placeholder)} required={item.required} onClick={() => this.setState({ selectedItem: index })} />
                                        }

                                        {/* Textarea */}
                                        {item.type == 'textarea' &&
                                            <textarea className="qubely-form-control" placeholder={__(item.placeholder)} required={item.required} onClick={() => this.setState({ selectedItem: index })}></textarea>
                                        }

                                        {layout == 'material' &&
                                            <label className="qubely-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }
                                    </div>
                                </div>
                            )}
                            <div className="qubely-form-group" style={{ width: '100%' }}>
                                <QubelyButtonEdit
                                    enableButton={enableButton}
                                    buttonFillType={buttonFillType}
                                    buttonSize={buttonSize}
                                    buttonText={buttonText}
                                    buttonIconName={buttonIconName}
                                    buttonIconPosition={buttonIconPosition}
                                    buttonTag={buttonTag}
                                    onTextChange={value => setAttributes({ buttonText: value })}
                                />
                            </div>
                        </form>

                        <div ref="qubelyContextMenu" className={`qubely-context-menu-wraper`} >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                qubelyContextMenu={this.refs.qubelyContextMenu}
                            />
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Edit;