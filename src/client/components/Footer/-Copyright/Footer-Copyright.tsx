import React from 'react';
import {cnFooter} from '../Footer';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextColorBlue3 from '../../Text/_color/Text_color_blue3';
import TextSize13 from '../../Text/_size/Text_size_13';
import {FooterVersion} from '../-Version/Footer-Version';

export const FooterCopyright = () =>
		<span className={cnFooter('Copyright') + ' ' + TextColorGray2 + ' ' + TextSize13}>
			<FooterVersion />
			<span>© 2007—2019 <span className={TextColorBlue3}>Yandex</span></span>
		</span>