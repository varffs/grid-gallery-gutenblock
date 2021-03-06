/**
 * BLOCK: grid-gallery
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { MediaUpload } = wp.editor;
const { Button } = wp.components;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import { GridItem } from '../GridItem.js';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/grid-gallery-3up', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Grid Gallery: 3up' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'grid gallery' ),
		__( 'grid' ),
		__( 'gallery' )
	],

	attributes: {
  	images: {
        type: 'array',
        source: 'query',
        selector: '.grid-gallery-image',
        query: {
            url: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
            },
            alt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
            },
            id: {
                type: 'string',
                source: 'attribute',
                attribute: 'data-id',
            },
        }
    }
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
   edit({ attributes, className, setAttributes }) {
    const galleryImage = (url) => {
      return(
        <img
          src={ url }
          className="grid-gallery-image"
        />
      );
    }

    const getImageButton = (openEvent) => {
      if (attributes.images && attributes.images.length) {
        return(
          <div>
            <div className="editor-items">
              { attributes.images.map( (image) => {
                return GridItem(image.url, image.alt)
              }) }
            </div>
            <Button
              onClick={ openEvent }
              className="button button-medium"
            >
              Change the 3 images
            </Button>
          </div>
        );
      } else {
        return(
          <div className="button-container">
            <Button
              onClick={ openEvent }
              className="button button-large"
            >
              Pick 3 images
            </Button>
          </div>
        );
      }
    };

		return (
			<div>
			  <MediaUpload
			    allowedTypes={ 'image' }
			    multiple={ true }
          onSelect={ images => {
            let insert = images.slice(0, 3).map( ( image ) => {
              return {
                url: image.url,
                alt: image.alt,
                id: image.id
              }
            });

            setAttributes( { images: insert } );
          } }
          render={ ({ open }) => getImageButton(open) }
        />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
  save({ attributes }) {
    if (attributes.images && attributes.images.length) {
      return(
      	<div>
          { attributes.images.map( (image) => {
            return GridItem(image.url, image.alt, image.id)
          }) }
      	</div>
      );
    } else {
      return(<div>Nothing set</div>);
    }
	},
} );
