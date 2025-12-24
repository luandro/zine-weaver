// Validation logic for Zine content
// This file is imported by sync-zines.mjs

function validateLocalizedString(obj, fieldPath) {
  if (!obj || typeof obj !== 'object') {
    return [`${fieldPath}: Expected localized string object, got ${typeof obj}`];
  }
  const errors = [];
  if (!obj.en) errors.push(`${fieldPath}.en is missing`);
  if (!obj.pt) errors.push(`${fieldPath}.pt is missing`);
  return errors;
}

function validateImageSpec(image, fieldPath) {
  if (!image) return [`${fieldPath} is missing`];
  const errors = [];
  errors.push(...validateLocalizedString(image.description, `${fieldPath}.description`));
  errors.push(...validateLocalizedString(image.alt_text, `${fieldPath}.alt_text`));
  if (!image.suggested_style) errors.push(`${fieldPath}.suggested_style is missing`);
  return errors;
}

function validateBlock(block, index, pageIndex) {
  const errors = [];
  const blockPath = `Page ${pageIndex} Block ${index} (${block.type})`;

  if (!block.id) errors.push(`${blockPath}: id is missing`);

  switch (block.type) {
    case 'cover':
      errors.push(...validateLocalizedString(block.title, `${blockPath}.title`));
      errors.push(...validateLocalizedString(block.subtitle, `${blockPath}.subtitle`));
      errors.push(...validateLocalizedString(block.series_title, `${blockPath}.series_title`));
      if (typeof block.issue_number !== 'number') errors.push(`${blockPath}.issue_number must be a number`);
      errors.push(...validateImageSpec(block.image, `${blockPath}.image`));
      if (!block.mood) errors.push(`${blockPath}.mood is missing`);
      break;

    case 'scene':
      errors.push(...validateImageSpec(block.image, `${blockPath}.image`));
      if (block.narrative) {
        errors.push(...validateLocalizedString(block.narrative, `${blockPath}.narrative`));
      }
      if (!block.mood) errors.push(`${blockPath}.mood is missing`);
      if (!block.layout) errors.push(`${blockPath}.layout is missing`);
      break;

    case 'dialogue':
      if (!block.speaker) errors.push(`${blockPath}.speaker is missing`);
      errors.push(...validateLocalizedString(block.speech, `${blockPath}.speech`));
      if (block.context) {
        errors.push(...validateLocalizedString(block.context, `${blockPath}.context`));
      }
      break;

    case 'prompt_block':
      errors.push(...validateLocalizedString(block.prompt_text, `${blockPath}.prompt_text`));
      if (block.context) {
        errors.push(...validateLocalizedString(block.context, `${blockPath}.context`));
      }
      break;

    case 'timeline':
      if (!Array.isArray(block.segments)) {
        errors.push(`${blockPath}.segments must be an array`);
      } else {
        block.segments.forEach((seg, i) => {
          errors.push(...validateLocalizedString(seg.label, `${blockPath}.segments[${i}].label`));
          errors.push(...validateLocalizedString(seg.sublabel, `${blockPath}.segments[${i}].sublabel`));
          if (typeof seg.proportion !== 'number') errors.push(`${blockPath}.segments[${i}].proportion must be a number`);
          if (!seg.color) errors.push(`${blockPath}.segments[${i}].color is missing`);
        });
      }
      errors.push(...validateLocalizedString(block.caption, `${blockPath}.caption`));
      break;

    case 'quote':
      errors.push(...validateLocalizedString(block.quote_text, `${blockPath}.quote_text`));
      if (block.attribution) {
        errors.push(...validateLocalizedString(block.attribution, `${blockPath}.attribution`));
      }
      if (!block.style) errors.push(`${blockPath}.style is missing`);
      break;

    case 'questions':
      if (!Array.isArray(block.questions)) {
        errors.push(`${blockPath}.questions must be an array`);
      } else {
        block.questions.forEach((q, i) => {
          errors.push(...validateLocalizedString(q, `${blockPath}.questions[${i}]`));
        });
      }
      break;
      
    case 'series_list':
        errors.push(...validateLocalizedString(block.series_title, `${blockPath}.series_title`));
        if (typeof block.current_issue !== 'number') errors.push(`${blockPath}.current_issue must be a number`);
        if (!Array.isArray(block.zines)) {
            errors.push(`${blockPath}.zines must be an array`);
        } else {
            block.zines.forEach((z, i) => {
                errors.push(...validateLocalizedString(z.title, `${blockPath}.zines[${i}].title`));
                errors.push(...validateLocalizedString(z.subtitle, `${blockPath}.zines[${i}].subtitle`));
                 if (typeof z.number !== 'number') errors.push(`${blockPath}.zines[${i}].number must be a number`);
                 if (!z.status) errors.push(`${blockPath}.zines[${i}].status is missing`);
            });
        }
        break;
        
    case 'colophon':
        errors.push(...validateLocalizedString(block.permissions, `${blockPath}.permissions`));
        errors.push(...validateLocalizedString(block.call_to_action, `${blockPath}.call_to_action`));
        if (block.credits) {
             errors.push(...validateLocalizedString(block.credits, `${blockPath}.credits`));
        }
        break;

    case 'transition':
      // minimal validation
      break;
      
    case 'visual_data':
       if (!block.visualization_type) errors.push(`${blockPath}.visualization_type is missing`);
       errors.push(...validateLocalizedString(block.caption, `${blockPath}.caption`));
       break;

    default:
      errors.push(`${blockPath}: Unknown block type '${block.type}'`);
  }

  return errors;
}

export function validateZine(zine, fileName) {
  const errors = [];
  
  if (!zine.id) errors.push(`[${fileName}] Missing id`);
  if (!zine.slug) errors.push(`[${fileName}] Missing slug`);
  
  if (!zine.metadata) {
    errors.push(`[${fileName}] Missing metadata`);
  } else {
    errors.push(...validateLocalizedString(zine.metadata.title, `[${fileName}] metadata.title`));
    errors.push(...validateLocalizedString(zine.metadata.subtitle, `[${fileName}] metadata.subtitle`));
    errors.push(...validateLocalizedString(zine.metadata.series_title, `[${fileName}] metadata.series_title`));
    if (typeof zine.metadata.issue_number !== 'number') errors.push(`[${fileName}] metadata.issue_number must be a number`);
  }

  if (!Array.isArray(zine.pages)) {
    errors.push(`[${fileName}] Pages must be an array`);
  } else {
    zine.pages.forEach((page, pIndex) => {
      if (!page.blocks) {
        errors.push(`[${fileName}] Page ${pIndex} blocks missing`);
        return;
      }
      page.blocks.forEach((block, bIndex) => {
        errors.push(...validateBlock(block, bIndex, pIndex));
      });
    });
  }

  return errors;
}
