
import classNames from 'classnames';
import '../../../components/css/color.scss';
import icons from '../../../helpers/icons';
const {
    useState,
} = wp.element;

const {
    Dropdown,
    ColorPicker,
} = wp.components;


export default function Color({ value, onChange, addNewColor = false }) {

    const [showColorPicker, toggleColorPicker] = useState();

    const classes = classNames(
        'qubely-field',
        'qubely-field-color',
        'qubely-d-flex',
        'qubely-align-center'
    );

    let containerClasses = classNames(
        'qubely-color-picker-container',
        { ['qubely-global']: addNewColor }
    )
    return (
        <div className={classes}>

            <Dropdown
                position="top center"
                className="qubely-ml-auto"
                renderToggle={({ isOpen, onToggle }) => (
                    <span className={containerClasses}>
                        {
                            addNewColor ?
                                <span
                                    isPrimary
                                    aria-expanded={isOpen}
                                    style={{ backgroundColor: 'transparent' }}
                                    onClick={onToggle}
                                >
                                    {icons.plus}
                                </span>
                                :
                                <span
                                    isPrimary
                                    aria-expanded={isOpen}
                                    className="qubely-color-picker"
                                    style={{ backgroundColor: value || 'transparent' }}
                                    onClick={onToggle}
                                />
                        }
                    </span>
                )}
                renderContent={() => {
                    return (
                        <ColorPicker
                            color={typeof value !== 'undefined' ? value : '#000'}
                            disableAlpha={false}
                            onChangeComplete={newColor => {
                                if (newColor.rgb && newColor.rgb.a != 1) {
                                    onChange('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
                                } else {
                                    onChange(newColor.hex);
                                }
                            }}
                        />
                    )
                }}
            />
        </div>
    );
}